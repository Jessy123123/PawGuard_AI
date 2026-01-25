// Gemini AI Service - SIMPLIFIED AND WORKING VERSION
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export interface AnimalIdentificationResult {
    isAnimal: boolean;
    species: 'dog' | 'cat' | 'unknown';
    breed: string;
    color: string;
    distinctiveFeatures: string[];
    estimatedAge: string;
    size: 'small' | 'medium' | 'large';
    condition: 'healthy' | 'injured' | 'unknown';
    confidence: number;
    rawResponse?: string;
}

/**
 * Convert image URI to base64
 */
async function imageToBase64(imageUri: string): Promise<string> {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            const base64Data = base64.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Identify animal using Gemini Vision AI
 */
export async function identifyAnimal(imageUri: string): Promise<AnimalIdentificationResult> {
    try {
        console.log('[Gemini] Starting identification...');

        // Use gemini-1.5-flash (current working model with vision)
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const base64Image = await imageToBase64(imageUri);

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image
                }
            },
            {
                text: `You are an expert at identifying dogs and cats. Analyze this image carefully.

If it's a dog or cat, provide details in this EXACT JSON format (no markdown, no code blocks):
{
    "isAnimal": true,
    "species": "dog" or "cat",
    "breed": "specific breed name",
    "color": "primary colors",
    "distinctiveFeatures": ["feature1", "feature2"],
    "estimatedAge": "puppy/kitten, young adult, adult, or senior",
    "size": "small, medium, or large",
    "condition": "healthy, injured, or unknown",
    "confidence": 0.9
}

If it's NOT a dog or cat:
{
    "isAnimal": false,
    "species": "unknown",
    "breed": "Unknown",
    "color": "Unknown",
    "distinctiveFeatures": [],
    "estimatedAge": "unknown",
    "size": "medium",
    "condition": "unknown",
    "confidence": 0
}

Respond ONLY with the JSON object, nothing else.`
            }
        ]);

        const responseText = result.response.text().trim();
        console.log('[Gemini] Raw response:', responseText.substring(0, 200));

        // Clean up markdown code blocks if present
        let cleanJson = responseText;
        if (cleanJson.includes('```')) {
            cleanJson = cleanJson.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        }

        const parsed = JSON.parse(cleanJson);
        console.log('[Gemini] ✅ Successfully parsed response');

        return {
            isAnimal: parsed.isAnimal ?? false,
            species: parsed.species ?? 'unknown',
            breed: parsed.breed ?? 'Unknown',
            color: parsed.color ?? 'Unknown',
            distinctiveFeatures: Array.isArray(parsed.distinctiveFeatures) ? parsed.distinctiveFeatures : [],
            estimatedAge: parsed.estimatedAge ?? 'unknown',
            size: parsed.size ?? 'medium',
            condition: parsed.condition ?? 'unknown',
            confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.7,
            rawResponse: responseText
        };

    } catch (error: any) {
        console.error('[Gemini] ❌ Error:', error.message || error);
        throw new Error(`Gemini AI error: ${error.message || 'Unknown error'}`);
    }
}
