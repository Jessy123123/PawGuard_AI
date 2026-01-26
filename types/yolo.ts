/**
 * YOLO Detection Types
 * Animal identification result interface for YOLO-only detection
 */

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

export interface YOLODetection {
    class_id: number;
    class_name: 'dog' | 'cat';
    confidence: number;
    bbox: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
}

export interface YOLOBackendResponse {
    success: boolean;
    detections: YOLODetection[];
    dog_detected: boolean;
    cat_detected: boolean;
    primary_detection: YOLODetection | null;
    error?: string;
}
