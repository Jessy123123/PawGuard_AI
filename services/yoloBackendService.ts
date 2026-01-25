/**
 * YOLO Backend Service
 * Communicates with Python Flask backend for YOLO detection
 */

const BACKEND_URL = process.env.EXPO_PUBLIC_YOLO_BACKEND_URL || 'http://localhost:5000';

interface BackendDetection {
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

interface BackendResponse {
    success: boolean;
    detections: BackendDetection[];
    dog_detected: boolean;
    cat_detected: boolean;
    primary_detection: BackendDetection | null;
    error?: string;
}

class YOLOBackendService {
    private backendAvailable: boolean | null = null;

    /**
     * Check if backend is available
     */
    async checkHealth(): Promise<boolean> {
        try {
            console.log(`🔍 Checking YOLO backend at ${BACKEND_URL}...`);
            const response = await fetch(`${BACKEND_URL}/health`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Backend available: ${data.model}`);
                this.backendAvailable = true;
                return true;
            }

            this.backendAvailable = false;
            return false;
        } catch (error) {
            console.log('⚠️ Backend not available:', error);
            this.backendAvailable = false;
            return false;
        }
    }

    /**
     * Convert image URI to base64
     */
    private async imageToBase64(imageUri: string): Promise<string> {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                // Remove data:image/...;base64, prefix
                const base64Data = base64.split(',')[1];
                resolve(base64Data);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    /**
     * Detect animals using backend YOLO service
     */
    async detectAnimals(imageUri: string): Promise<BackendResponse> {
        console.log(`[Backend YOLO] Detecting animals...`);

        // Check if backend is available (only first time)
        if (this.backendAvailable === null) {
            await this.checkHealth();
        }

        if (!this.backendAvailable) {
            throw new Error('Backend YOLO service not available');
        }

        try {
            // Convert image to base64
            const base64Image = await this.imageToBase64(imageUri);

            // Send to backend
            console.log(`📤 Sending image to backend (${base64Image.length} bytes)...`);
            const response = await fetch(`${BACKEND_URL}/detect`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64Image }),
            });

            if (!response.ok) {
                throw new Error(`Backend returned ${response.status}`);
            }

            const result: BackendResponse = await response.json();

            if (!result.success) {
                throw new Error(result.error || 'Detection failed');
            }

            console.log(`✅ Backend detected ${result.detections.length} animals`);
            return result;

        } catch (error: any) {
            console.error('Backend YOLO detection failed:', error);
            throw error;
        }
    }
}

export const yoloBackendService = new YOLOBackendService();
export default yoloBackendService;
