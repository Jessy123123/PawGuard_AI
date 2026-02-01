/**
 * Vertex AI Embedding Service
 * Generates 1408-dimension embeddings from images using Vertex AI Multimodal Embeddings
 */

import * as FileSystem from 'expo-file-system/legacy';

interface EmbeddingResult {
    embedding: number[];
    dimensions: number;
    success: boolean;
    message?: string;
}

const EMBEDDING_FUNCTION_URL = 'https://us-central1-pawguardai-4ee35.cloudfunctions.net/generateEmbedding';

/**
 * Generate image embedding using Vertex AI Multimodal Embeddings
 */
export async function generateImageEmbedding(imageUri: string): Promise<number[]> {
    try {
        console.log('📊 Generating Vertex AI embedding for image...');
        console.log('🔗 Function URL:', EMBEDDING_FUNCTION_URL);

        // Convert image to base64
        const base64 = await FileSystem.readAsStringAsync(imageUri, {
            encoding: 'base64',
        });
        console.log(`📷 Image converted to base64: ${base64.length} characters`);

        // Call Cloud Function
        const response = await fetch(EMBEDDING_FUNCTION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                imageBase64: base64,
            }),
        });

        console.log(`📡 Response status: ${response.status}`);

        // Get response as text first to debug
        const responseText = await response.text();
        console.log(`📄 Response preview: ${responseText.substring(0, 200)}...`);

        // Check if response is HTML (error page)
        if (responseText.startsWith('<') || responseText.startsWith('<!')) {
            throw new Error(`Cloud Function returned HTML error page. Status: ${response.status}. Check Firebase Console logs for details.`);
        }

        // Try to parse as JSON
        let result: EmbeddingResult;
        try {
            result = JSON.parse(responseText);
        } catch (parseError) {
            throw new Error(`Failed to parse response as JSON: ${responseText.substring(0, 100)}`);
        }

        if (!response.ok || !result.success) {
            throw new Error(result.message || `HTTP ${response.status}: Embedding generation failed`);
        }

        if (!result.embedding || result.embedding.length === 0) {
            throw new Error('Empty embedding returned from Cloud Function');
        }

        console.log(`✅ Generated ${result.dimensions}-dimension embedding`);
        return result.embedding;

    } catch (error: any) {
        console.error('❌ Embedding generation failed:', error.message);
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
