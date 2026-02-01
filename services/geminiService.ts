/**
 * Gemini AI Service
 * Uses Google Gemini 2.5 Flash for animal detection and analysis
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import * as FileSystem from 'expo-file-system/legacy';

const GOOGLE_AI_KEY = process.env.EXPO_PUBLIC_GOOGLE_AI_KEY;

// DEBUG: Log to verify key is loaded
console.log('[Gemini] API Key loaded:', GOOGLE_AI_KEY ? `${GOOGLE_AI_KEY.substring(0, 10)}...` : 'MISSING!');

if (!GOOGLE_AI_KEY) {
    console.error('Missing EXPO_PUBLIC_GOOGLE_AI_KEY in environment variables');
    // We don't throw immediately to allow app to load, but functionality will be broken
}

const genAI = new GoogleGenerativeAI(GOOGLE_AI_KEY || '');

interface GeminiDetectionResult {
    success: boolean;
    animalType: string | null;
    species: string | null;
    healthStatus: string | null;
    confidence: number;
    description: string;
    immediateActions: string[];
    error?: string;
}

class GeminiService {
    // Using 'gemini-2.0-flash' - older models (1.5-flash, gemini-pro) have been retired
    private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    /**
     * Convert image URI to base64
     */
    private async imageToBase64(imageUri: string): Promise<string> {
        try {
            const base64 = await FileSystem.readAsStringAsync(imageUri, {
                encoding: 'base64',
            });
            return base64;
        } catch (error) {
            console.error('[Gemini Service] Error reading image file:', error);
            throw error;
        }
    }

    /**
     * Detect and analyze animals using Gemini 2.5 Flash
     */
    async detectAnimals(imageUri: string): Promise<GeminiDetectionResult> {
        console.log(`[Gemini AI] Analyzing image for animal detection...`);

        try {
            // Convert image to base64
            const base64Image = await this.imageToBase64(imageUri);

            // Determine MIME type from URI
            const mimeType = imageUri.toLowerCase().endsWith('.png')
                ? 'image/png'
                : 'image/jpeg';

            // Create the prompt for animal detection
            const prompt = `Analyze this image and provide detailed information about any animals present.

Please respond in the following JSON format:
{
    "animalDetected": true/false,
    "animalType": "dog" or "cat" or "other" or null,
    "species": "specific breed or species name" or null,
    "healthStatus": "healthy" or "injured" or "sick" or "distressed" or "unknown",
    "confidence": 0.0 to 1.0,
    "description": "detailed description of the animal and its condition",
    "immediateActions": ["action 1", "action 2", ...]
}

If no animal is detected, set animalDetected to false and other fields to null or empty.
Focus on identifying dogs and cats, but also recognize other animals.
Assess the animal's health status based on visible signs.
Provide actionable recommendations if the animal appears to need help.`;

            // Generate content with the image
            const result = await this.model.generateContent([
                prompt,
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: mimeType,
                    },
                },
            ]);

            const response = result.response;
            const text = response.text();

            console.log(`[Gemini AI] Raw response:`, text);

            // Parse the JSON response
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error('Failed to parse Gemini response as JSON');
            }

            const parsed = JSON.parse(jsonMatch[0]);

            // Transform to our standard format
            const detectionResult: GeminiDetectionResult = {
                success: parsed.animalDetected || false,
                animalType: parsed.animalType || null,
                species: parsed.species || null,
                healthStatus: parsed.healthStatus || 'unknown',
                confidence: parsed.confidence || 0,
                description: parsed.description || 'No description available',
                immediateActions: parsed.immediateActions || [],
            };

            console.log(`✅ Gemini detection complete:`, {
                success: detectionResult.success,
                animalType: detectionResult.animalType,
                species: detectionResult.species,
                confidence: detectionResult.confidence,
            });

            return detectionResult;

        } catch (error: any) {
            console.error('❌ Gemini detection failed:', error);
            return {
                success: false,
                animalType: null,
                species: null,
                healthStatus: null,
                confidence: 0,
                description: 'Detection failed',
                immediateActions: [],
                error: error.message,
            };
        }
    }

    /**
     * Generate embeddings for similarity search (future feature)
     * Note: This would use Vertex AI Multimodal Embeddings API
     */
    async generateEmbedding(imageUri: string): Promise<number[] | null> {
        // TODO: Implement using Vertex AI Multimodal Embeddings API
        // For now, return null as this requires additional setup
        console.log('[Gemini Service] Embedding generation not yet implemented');
        return null;
    }
}

export const geminiService = new GeminiService();
export default geminiService;
