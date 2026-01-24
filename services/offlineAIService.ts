
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

import { loadTensorflowModel } from 'react-native-fast-tflite';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as jpeg from 'jpeg-js';
import { Buffer } from 'buffer';

// Load assets
const modelAsset = require('../assets/mobilenet_v2_1.0_224.tflite');
const labelsAsset = require('../assets/labels.txt');

interface ClassificationResult {
    label: string;
    confidence: number;
}

class OfflineAIService {
    private model: any = null;
    private labels: string[] = [];
    private isReady = false;

    async initialize() {
        if (this.isReady) return;

        try {
            console.log('Initializing Offline AI...');

            // Load labels
            const labelsUri = Asset.fromModule(labelsAsset).uri;
            const labelsContent = await FileSystem.readAsStringAsync(labelsUri);
            this.labels = labelsContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);

            // Load model
            // Native load
            this.model = await loadTensorflowModel(modelAsset);

            this.isReady = true;
            console.log('Offline AI Initialized');
        } catch (error) {
            console.error('Failed to init Offline AI:', error);
        }
    }

    async classifyImage(imageUri: string): Promise<ClassificationResult[]> {
        console.log(`[OfflineAI] classifyImage called with URI: ${imageUri}`);
        if (!this.isReady) await this.initialize();
        if (!this.model) {
            console.error('[OfflineAI] Model is NULL even after init!');
            throw new Error('Model not loaded');
        }

        try {
            console.log('[OfflineAI] Starting image manipulation...');
            // 1. Resize image to 224x224 (MobileNet standard)
            const manipResult = await manipulateAsync(
                imageUri,
                [{ resize: { width: 224, height: 224 } }],
                { format: SaveFormat.JPEG }
            );

            // 2. Read transformed image as Base64 to convert to raw data
            const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
                encoding: 'base64',
            });

            // 3. Decode JPEG to get raw pixel data (Uint8Array of RGBA values)
            const imgBuffer = Buffer.from(base64, 'base64');
            const rawImageData = jpeg.decode(imgBuffer, { useTArray: true }); // returns { width, height, data: Uint8Array }

            // 4. Preprocess: Convert RGBA -> RGB and Normalize (Float32 for MobileNet)
            // MobileNet V2 typically expects Float32 input [-1, 1] or [0, 1]
            // Standard ImageNet normalization: (pixel - 127.5) / 127.5  => Range [-1, 1]

            const { data, width, height } = rawImageData;
            const inputTensor = new Float32Array(width * height * 3);

            let offset = 0;
            for (let i = 0; i < data.length; i += 4) {
                // jpeg-js produces [R, G, B, A]
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                // skip alpha at i+3

                // Normalize to [-1, 1]
                inputTensor[offset++] = (r - 127.5) / 127.5;
                inputTensor[offset++] = (g - 127.5) / 127.5;
                inputTensor[offset++] = (b - 127.5) / 127.5;
            }

            // 5. Run Inference
            // react-native-fast-tflite .run() takes the raw typed array
            const output = await this.model.run([inputTensor]);
            const resultProbabilities = output[0]; // Assuming output shape [1, 1001]

            // 6. Map to labels
            const results: ClassificationResult[] = [];

            // Find top matches
            // We'll just look for indices with high probability
            for (let i = 0; i < resultProbabilities.length; i++) {
                const confidence = resultProbabilities[i];
                if (confidence > 0.1) { // Threshold
                    // Map index to label. 
                    // Note: MobileNet labels sometimes have a background class at 0, or shift by 1.
                    // We use direct mapping for now, checking bounds.
                    if (this.labels[i]) {
                        results.push({
                            label: this.labels[i],
                            confidence: confidence
                        });
                    }
                }
            }

            // Sort by confidence
            results.sort((a, b) => b.confidence - a.confidence);

            console.log('TFLite Results:', results.slice(0, 3));
            return results.slice(0, 5);

        } catch (e) {
            console.error('Offline identification failed:', e);
            return [];
        }
    }
}

export const offlineAI = new OfflineAIService();
