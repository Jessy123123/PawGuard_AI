import { onRequest } from "firebase-functions/v2/https";
import { PredictionServiceClient } from "@google-cloud/aiplatform";

// ========================================
// Vertex AI Multimodal Embeddings Function
// ========================================

const PROJECT_ID = "pawguardai-4ee35";
const LOCATION = "us-central1";
const MODEL = "multimodalembedding@001";

// Initialize the AI Platform client
const aiplatformClient = new PredictionServiceClient({
    apiEndpoint: `${LOCATION}-aiplatform.googleapis.com`,
});

export const generateEmbedding = onRequest(
    {
        region: LOCATION,
        timeoutSeconds: 120,
        memory: "1GiB",
        cors: true, // Enable CORS for all origins
        // Uses Compute Engine default service account which needs Vertex AI User role
    },
    async (req, res) => {
        // Handle CORS preflight
        if (req.method === "OPTIONS") {
            res.set("Access-Control-Allow-Origin", "*");
            res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
            res.set("Access-Control-Allow-Headers", "Content-Type");
            res.status(204).send("");
            return;
        }

        // Set CORS headers for all responses
        res.set("Access-Control-Allow-Origin", "*");

        try {
            console.log("📊 generateEmbedding function called");

            const { imageBase64 } = req.body;

            if (!imageBase64) {
                console.error("❌ Missing imageBase64 in request body");
                return res.status(400).json({
                    error: "Missing imageBase64 in request body",
                    success: false
                });
            }

            console.log(`📷 Received image data: ${imageBase64.length} characters`);

            const endpoint = `projects/${PROJECT_ID}/locations/${LOCATION}/publishers/google/models/${MODEL}`;

            const instance = {
                image: {
                    bytesBase64Encoded: imageBase64,
                },
            };

            console.log("🚀 Calling Vertex AI Multimodal Embeddings API...");

            const [response] = await aiplatformClient.predict({
                endpoint,
                instances: [instance],
                parameters: { dimension: 1408 },
            });

            if (!response.predictions || response.predictions.length === 0) {
                throw new Error("No predictions returned from Vertex AI");
            }

            const embedding = response.predictions[0].imageEmbedding;

            if (!embedding || embedding.length === 0) {
                throw new Error("Empty embedding returned from Vertex AI");
            }

            console.log(`✅ Generated ${embedding.length}-dimension embedding`);

            res.status(200).json({
                embedding: embedding,
                dimensions: embedding.length,
                success: true
            });

        } catch (err) {
            console.error("❌ Embedding generation failed:", err.message);
            console.error("Full error:", err);

            res.status(500).json({
                error: "Embedding generation failed",
                message: err.message || "Unknown error",
                success: false
            });
        }
    }
);