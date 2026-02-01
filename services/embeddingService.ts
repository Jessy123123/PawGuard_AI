/**
 * Vertex AI Embedding Service
 * Generates 1408-dimension embeddings from images using Vertex AI Multimodal Embeddings
 */

import * as FileSystem from 'expo-file-system/legacy';

interface EmbeddingResult {
    embedding: number[];
    dimensions: number;
}

const EMBEDDING_FUNCTION_URL = 'https://us-central1-pawguardai-4ee35.cloudfunctions.net/generateEmbedding';

/**
 * Generate image embedding using Vertex AI Multimodal Embeddings
 */
export async function generateImageEmbedding(imageUri: string): Promise<number[]> {
    try {
        console.log('📊 Generating Vertex AI embedding for image...');

        // Convert image to base64
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: 'base64',
        });

        // Call Cloud Function
        const response = await fetch(EMBEDDING_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                imageBase64: base64,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Embedding generation failed');
        }

        const result: EmbeddingResult = await response.json();

        console.log(`✅ Generated ${result.dimensions}-dimension embedding`);
        return result.embedding;

    } catch (error: any) {
        console.error('❌ Embedding generation failed:', error);
        throw error;
    }
}

/**
 * Calculate cosine similarity between two embeddings
 * Returns a value between -1 and 1 (1 = identical, 0 = orthogonal, -1 = opposite)
 */
export function cosineSimilarity(embedding1: number[], embedding2: number[]): number {
    if (embedding1.length !== embedding2.length) {
        throw new Error('Embeddings must have the same dimensions');
    }

    let dotProduct = 0;
    let norm1 = 0;
    let norm2 = 0;

    for (let i = 0; i < embedding1.length; i++) {
        dotProduct += embedding1[i] * embedding2[i];
        norm1 += embedding1[i] * embedding1[i];
        norm2 += embedding2[i] * embedding2[i];
    }

    return dotProduct / (Math.sqrt(norm1) * Math.sqrt(norm2));
}
