/**
 * YOLOv11 AI Service for Animal Detection
 * Uses TensorFlow Lite with YOLOv11 model for real-time object detection
 */

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as jpeg from 'jpeg-js';
import { Buffer } from 'buffer';

// YOLO model configuration
const YOLO_INPUT_SIZE = 640; // YOLOv11 standard input size
const CONFIDENCE_THRESHOLD = 0.5;
const IOU_THRESHOLD = 0.45;

// COCO dataset class IDs for animals
const ANIMAL_CLASSES = {
    15: 'bird',
    16: 'cat',
    17: 'dog',
    18: 'horse',
    19: 'sheep',
    20: 'cow',
    21: 'elephant',
    22: 'bear',
    23: 'zebra',
    24: 'giraffe'
};

interface Detection {
    classId: number;
    className: string;
    confidence: number;
    bbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

interface YOLOResult {
    detections: Detection[];
    dogDetected: boolean;
    catDetected: boolean;
    primaryDetection: Detection | null;
}

class YOLOService {
    private model: any = null;
    private isReady = false;
    private loadTensorflowModel: any = null;
    private tfliteAvailable: boolean | null = null;

    /**
     * Lazy load TFLite module
     */
    private async loadTFLiteModule(): Promise<boolean> {
        if (this.tfliteAvailable !== null) {
            return this.tfliteAvailable;
        }

        try {
            const tfliteModule = require('react-native-fast-tflite');
            this.loadTensorflowModel = tfliteModule.loadTensorflowModel;
            this.tfliteAvailable = true;
            console.log('✅ TFLite module loaded for YOLO');
            return true;
        } catch (error) {
            console.warn('⚠️ TFLite not available. YOLO detection disabled.');
            console.warn('Build with: npx expo run:android');
            this.tfliteAvailable = false;
            return false;
        }
    }

    /**
     * Initialize YOLO model
     */
    async initialize() {
        if (this.isReady) return;

        try {
            console.log('🔍 Initializing YOLOv11...');

            const canUseTFLite = await this.loadTFLiteModule();
            if (!canUseTFLite) {
                console.log('Skipping YOLO initialization (TFLite not available)');
                return;
            }

            // Load YOLOv11 model
            console.log('📦 Loading YOLOv11 model from assets...');
            const modelAsset = require('../assets/yolov11n.tflite');
            this.model = await this.loadTensorflowModel(modelAsset);

            this.isReady = true;
            console.log('✅ YOLOv11 loaded successfully!');
        } catch (error) {
            console.error('❌ Failed to init YOLO:', error);
        }
    }

    /**
     * Non-Maximum Suppression to remove overlapping boxes
     */
    private nms(detections: Detection[], iouThreshold: number): Detection[] {
        // Sort by confidence
        const sorted = detections.sort((a, b) => b.confidence - a.confidence);
        const selected: Detection[] = [];

        for (const detection of sorted) {
            let shouldSelect = true;

            for (const selectedDet of selected) {
                const iou = this.calculateIoU(detection.bbox, selectedDet.bbox);
                if (iou > iouThreshold) {
                    shouldSelect = false;
                    break;
                }
            }

            if (shouldSelect) {
                selected.push(detection);
            }
        }

        return selected;
    }

    /**
     * Calculate Intersection over Union
     */
    private calculateIoU(box1: any, box2: any): number {
        const x1 = Math.max(box1.x, box2.x);
        const y1 = Math.max(box1.y, box2.y);
        const x2 = Math.min(box1.x + box1.width, box2.x + box2.width);
        const y2 = Math.min(box1.y + box1.height, box2.y + box2.height);

        const intersection = Math.max(0, x2 - x1) * Math.max(0, y2 - y1);
        const area1 = box1.width * box1.height;
        const area2 = box2.width * box2.height;
        const union = area1 + area2 - intersection;

        return union > 0 ? intersection / union : 0;
    }

    /**
     * Detect animals in image using YOLO
     */
    async detectAnimals(imageUri: string): Promise<YOLOResult> {
        console.log(`[YOLO] Detection called for: ${imageUri}`);

        if (!this.isReady) await this.initialize();

        if (!this.model) {
            console.error('[YOLO] Model not loaded!');
            throw new Error('YOLO model not available. Running in development build?');
        }

        try {
            // 1. Preprocess image for YOLO
            const manipResult = await manipulateAsync(
                imageUri,
                [{ resize: { width: YOLO_INPUT_SIZE, height: YOLO_INPUT_SIZE } }],
                { format: SaveFormat.JPEG }
            );

            // 2. Convert to tensor
            const base64 = await FileSystem.readAsStringAsync(manipResult.uri, {
                encoding: 'base64',
            });

            const imgBuffer = Buffer.from(base64, 'base64');
            const rawImageData = jpeg.decode(imgBuffer, { useTArray: true });

            const { data, width, height } = rawImageData;
            const inputTensor = new Float32Array(width * height * 3);

            // YOLO expects normalized [0, 1] RGB
            let offset = 0;
            for (let i = 0; i < data.length; i += 4) {
                inputTensor[offset++] = data[i] / 255.0;       // R
                inputTensor[offset++] = data[i + 1] / 255.0;   // G
                inputTensor[offset++] = data[i + 2] / 255.0;   // B
            }

            // 3. Run YOLO inference
            const output = await this.model.run([inputTensor]);

            // 4. Parse YOLO output
            const detections = this.parseYOLOOutput(output[0]);

            // 5. Apply NMS
            const finalDetections = this.nms(detections, IOU_THRESHOLD);

            // 6. Filter for cats and dogs
            const dogDetections = finalDetections.filter(d => d.classId === 17);
            const catDetections = finalDetections.filter(d => d.classId === 16);

            return {
                detections: finalDetections.filter(d => d.classId === 16 || d.classId === 17),
                dogDetected: dogDetections.length > 0,
                catDetected: catDetections.length > 0,
                primaryDetection: dogDetections[0] || catDetections[0] || null
            };

        } catch (error) {
            console.error('YOLO detection failed:', error);
            throw error;
        }
    }

    /**
     * Parse YOLO model output
     * YOLOv11 TFLite output format: [1, boxes, 84]
     * Each box: [x_center, y_center, width, height, class0_conf, class1_conf, ..., class79_conf]
     */
    private parseYOLOOutput(output: Float32Array): Detection[] {
        const detections: Detection[] = [];

        // YOLOv11 typically outputs [1, num_boxes, 84] where:
        // - First 4 values: x_center, y_center, width, height (normalized 0-1)
        // - Next 80 values: class confidences for COCO classes

        const numClasses = 80; // COCO dataset
        const boxAttributes = 4 + numClasses; // 84 total
        const numBoxes = Math.floor(output.length / boxAttributes);

        console.log(`[YOLO] Parsing ${numBoxes} potential detections...`);

        for (let i = 0; i < numBoxes; i++) {
            const offset = i * boxAttributes;

            // Extract bounding box (normalized coordinates)
            const xCenter = output[offset];
            const yCenter = output[offset + 1];
            const width = output[offset + 2];
            const height = output[offset + 3];

            // Find highest confidence class
            let maxConf = 0;
            let maxClassId = -1;

            for (let c = 0; c < numClasses; c++) {
                const conf = output[offset + 4 + c];
                if (conf > maxConf) {
                    maxConf = conf;
                    maxClassId = c;
                }
            }

            // Filter by confidence threshold
            if (maxConf >= CONFIDENCE_THRESHOLD) {
                // Only keep animal classes (cats and dogs)
                if (maxClassId === 16 || maxClassId === 17) {
                    // Convert to corner coordinates
                    const x = (xCenter - width / 2) * YOLO_INPUT_SIZE;
                    const y = (yCenter - height / 2) * YOLO_INPUT_SIZE;
                    const w = width * YOLO_INPUT_SIZE;
                    const h = height * YOLO_INPUT_SIZE;

                    detections.push({
                        classId: maxClassId,
                        className: ANIMAL_CLASSES[maxClassId as keyof typeof ANIMAL_CLASSES],
                        confidence: maxConf,
                        bbox: { x, y, width: w, height: h }
                    });
                }
            }
        }

        console.log(`[YOLO] Found ${detections.length} animals (threshold: ${CONFIDENCE_THRESHOLD})`);
        return detections;
    }
}

export const yoloService = new YOLOService();
export default yoloService;
