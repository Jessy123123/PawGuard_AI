import { onRequest } from "firebase-functions/v2/https";
import { PredictionServiceClient } from "@google-cloud/aiplatform";

// ========================================
// Vertex AI Multimodal Embeddings Function
// ========================================

const aiplatformClient = new PredictionServiceClient({
    apiEndpoint: "us-central1-aiplatform.googleapis.com",
});

export const generateEmbedding = onRequest(
    {
        region: "us-central1",
        timeoutSeconds: 60,
        memory: "512MiB",
    },
    async (req, res) => {
        try {
            const { imageBase64 } = req.body;

            if (!imageBase64) {
                return res.status(400).json({
                    error: "Missing imageBase64 in request body"
                });
            }

            const projectId = "pawguardai-4ee35";
            const location = "us-central1";
            const model = "multimodalembedding@001";

            const endpoint = `projects/${projectId}/locations/${location}/publishers/google/models/${model}`;

            const instance = {
                image: {
                    bytesBase64Encoded: imageBase64,
                },
            };

            const instances = [instance];
            const parameter = {
                dimension: 1408,
            };

            console.log("📊 Calling Vertex AI Multimodal Embeddings API...");

            const [response] = await aiplatformClient.predict({
                endpoint,
                instances,
                parameters: parameter,
            });

            const embedding = response.predictions[0].imageEmbedding;

            console.log(`✅ Generated ${embedding.length}-dimension embedding`);

            res.json({
                embedding: embedding,
                dimensions: embedding.length,
            });

        } catch (err) {
            console.error("❌ Embedding generation failed:", err);
            res.status(500).json({
                error: "Embedding generation failed",
                message: err.message
            });
        }
    }
);