// Gemini AI Service for Animal Recognition
import { GoogleGenerativeAI } from '@google/generative-ai';
import { offlineAI } from './offlineAIService';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';

if (!GEMINI_API_KEY) {
    console.warn('Gemini API key not found. Please set EXPO_PUBLIC_GEMINI_API_KEY in .env');
}

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

export interface FeatureMatchResult {
    isMatch: boolean;
    confidence: number;
    matchingFeatures: string[];
    differentFeatures: string[];
}

/**
 * Convert image URI to base64 for Gemini API
 */
async function imageToBase64(imageUri: string): Promise<string> {
    const response = await fetch(imageUri);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64 = reader.result as string;
            // Remove the data:image/...;base64, prefix
            const base64Data = base64.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

/**
 * Identify an animal from an image using Gemini Vision
 */
export async function identifyAnimal(imageUri: string): Promise<AnimalIdentificationResult> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const base64Image = await imageToBase64(imageUri);

        const prompt = `Analyze this image and identify if it contains a dog or cat. 
Respond ONLY with a valid JSON object (no markdown, no code blocks) in this exact format:
{
    "isAnimal": true/false,
    "species": "dog" or "cat" or "unknown",
    "breed": "specific breed or mix description",
    "color": "primary color and pattern (e.g., 'golden', 'black and white spotted', 'orange tabby')",
    "distinctiveFeatures": ["list", "of", "unique", "identifying", "marks", "like", "scars", "ear shape", "tail type", "collar"],
    "estimatedAge": "puppy/kitten", "young adult", "adult", or "senior",
    "size": "small", "medium", or "large",
    "condition": "healthy", "injured", or "unknown",
    "confidence": 0.0 to 1.0
}

Be as specific as possible about distinctive features that could help identify this specific animal again.
If no animal is detected, set isAnimal to false and leave other fields with default values.`;

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image
                }
            },
            prompt
        ]);

        const responseText = result.response.text().trim();

        // Clean up response - remove markdown code blocks if present
        let cleanJson = responseText;
        if (cleanJson.startsWith('```')) {
            cleanJson = cleanJson.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
        }

        const parsed = JSON.parse(cleanJson);

        return {
            isAnimal: parsed.isAnimal ?? false,
            species: parsed.species ?? 'unknown',
            breed: parsed.breed ?? 'Unknown',
            color: parsed.color ?? 'Unknown',
            distinctiveFeatures: parsed.distinctiveFeatures ?? [],
            estimatedAge: parsed.estimatedAge ?? 'unknown',
            size: parsed.size ?? 'medium',
            condition: parsed.condition ?? 'unknown',
            confidence: parsed.confidence ?? 0,
            rawResponse: responseText
        };


    } catch (error: any) {
        console.error('Error identifying animal:', error);

        // Check for Quota Exceeded (HTTP 429) or other API errors
        // Also fallback if error is a fetch failure (e.g. network issue)
        const errorMessage = error.message || '';
        if (errorMessage.includes('429') || errorMessage.includes('Quota') || errorMessage.includes('Fetch failure') || errorMessage.includes('network')) {
            console.log('Gemini API quota exceeded or offline. Switching to Offline AI...');

            try {
                // Initialize if needed
                await offlineAI.initialize();

                // Run offline classification
                const offlineResults = await offlineAI.classifyImage(imageUri);

                if (offlineResults.length > 0) {
                    const bestMatch = offlineResults[0];
                    const labelLower = bestMatch.label.toLowerCase();

                    const isDog = labelLower.includes('dog') ||
                        labelLower.includes('retriever') ||
                        labelLower.includes('terrier') ||
                        labelLower.includes('hound') ||
                        labelLower.includes('spaniel') ||
                        labelLower.includes('bulldog') ||
                        labelLower.includes('shepherd');

                    const isCat = labelLower.includes('cat') ||
                        labelLower.includes('tabby') ||
                        labelLower.includes('siamese') ||
                        labelLower.includes('persian') ||
                        labelLower.includes('kitty');

                    return {
                        isAnimal: true,
                        species: isDog ? 'dog' : (isCat ? 'cat' : 'unknown'),
                        breed: bestMatch.label, // Use ImageNet label as breed guess
                        color: 'Unknown (Offline Mode)',
                        distinctiveFeatures: ['Identified via Offline AI'],
                        estimatedAge: 'unknown',
                        size: 'medium',
                        condition: 'unknown',
                        confidence: bestMatch.confidence,
                        rawResponse: `Offline TFLite: ${bestMatch.label}`
                    };
                }
            } catch (offlineError) {
                console.error('Offline AI also failed:', offlineError);
            }
        }

        throw error;
    }
}

/**
 * Generate a searchable feature hash for an animal
 * Used for finding potential matches in the database
 */
export function generateFeatureHash(result: AnimalIdentificationResult): string {
    const features = [
        result.species,
        result.breed.toLowerCase().replace(/\s+/g, '_'),
        result.color.toLowerCase().replace(/\s+/g, '_'),
        result.size,
        ...result.distinctiveFeatures.map(f => f.toLowerCase().replace(/\s+/g, '_'))
    ];

    return features.filter(Boolean).join('|');
}

/**
 * Compare two animals to determine if they might be the same
 */
export async function compareAnimals(
    imageUri1: string,
    imageUri2: string
): Promise<FeatureMatchResult> {
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const [base64Image1, base64Image2] = await Promise.all([
            imageToBase64(imageUri1),
            imageToBase64(imageUri2)
        ]);

        const prompt = `Compare these two images and determine if they show the SAME individual animal (not just the same breed).
Look for matching distinctive features like:
- Exact fur patterns and markings
- Scars or unique marks
- Ear shape and any notches
- Eye color
- Collar or accessories
- Body shape specifics

Respond ONLY with a valid JSON object (no markdown):
{
    "isMatch": true/false,
    "confidence": 0.0 to 1.0,
    "matchingFeatures": ["list of features that match"],
    "differentFeatures": ["list of features that differ"]
}`;

        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image1
                }
            },
            {
                inlineData: {
                    mimeType: 'image/jpeg',
                    data: base64Image2
                }
            },
            prompt
        ]);

        const responseText = result.response.text().trim();
        let cleanJson = responseText;
        if (cleanJson.startsWith('```')) {
            cleanJson = cleanJson.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
        }

        const parsed = JSON.parse(cleanJson);

        return {
            isMatch: parsed.isMatch ?? false,
            confidence: parsed.confidence ?? 0,
            matchingFeatures: parsed.matchingFeatures ?? [],
            differentFeatures: parsed.differentFeatures ?? []
        };
    } catch (error) {
        console.error('Error comparing animals:', error);
        return {
            isMatch: false,
            confidence: 0,
            matchingFeatures: [],
            differentFeatures: ['Error during comparison']
        };
    }
}

export default {
    identifyAnimal,
    generateFeatureHash,
    compareAnimals
};
