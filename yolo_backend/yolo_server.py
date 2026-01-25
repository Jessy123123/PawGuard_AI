"""
YOLO Backend Server for PawGuard AI
Python Flask server that provides animal detection using YOLOv8
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
import base64
import cv2
import numpy as np
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for React Native requests

# Load YOLOv8 model (will auto-download on first run)
print("🔄 Loading YOLOv8 model...")
model = YOLO('yolov8n.pt')  # nano version for faster inference
print("✅ YOLOv8 model loaded successfully!")

# COCO class names
ANIMAL_CLASSES = {
    16: 'cat',
    17: 'dog'
}

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        "status": "ok",
        "model": "YOLOv8n",
        "timestamp": datetime.now().isoformat()
    })

@app.route('/detect', methods=['POST'])
def detect():
    """
    Detect animals in an image
    
    Request body:
    {
        "image": "base64_encoded_image"
    }
    
    Response:
    {
        "success": true,
        "detections": [...],
        "dog_detected": bool,
        "cat_detected": bool,
        "primary_detection": {...}
    }
    """
    try:
        # Get JSON data
        data = request.json
        if not data or 'image' not in data:
            return jsonify({
                "success": False,
                "error": "No image provided"
            }), 400
        
        # Decode base64 image
        image_b64 = data['image'].split(",")[-1]
        img_bytes = base64.b64decode(image_b64)
        nparr = np.frombuffer(img_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None:
            return jsonify({
                "success": False,
                "error": "Failed to decode image"
            }), 400
        
        print(f"📸 Processing image: {img.shape}")
        
        # Run YOLO detection
        results = model(img, conf=0.5, verbose=False)
        
        # Process results
        detections = []
        for r in results:
            boxes = r.boxes
            for box in boxes:
                class_id = int(box.cls[0])
                
                # Only keep cats (16) and dogs (17)
                if class_id in ANIMAL_CLASSES:
                    confidence = float(box.conf[0])
                    xyxy = box.xyxy[0].cpu().numpy()
                    
                    detection = {
                        "class_id": class_id,
                        "class_name": ANIMAL_CLASSES[class_id],
                        "confidence": confidence,
                        "bbox": {
                            "x": float(xyxy[0]),
                            "y": float(xyxy[1]),
                            "width": float(xyxy[2] - xyxy[0]),
                            "height": float(xyxy[3] - xyxy[1])
                        }
                    }
                    detections.append(detection)
        
        # Sort by confidence (highest first)
        detections.sort(key=lambda x: x['confidence'], reverse=True)
        
        # Determine what was detected
        dog_detected = any(d['class_id'] == 17 for d in detections)
        cat_detected = any(d['class_id'] == 16 for d in detections)
        primary_detection = detections[0] if detections else None
        
        print(f"✅ Detected {len(detections)} animals (Dogs: {dog_detected}, Cats: {cat_detected})")
        
        return jsonify({
            "success": True,
            "detections": detections,
            "dog_detected": dog_detected,
            "cat_detected": cat_detected,
            "primary_detection": primary_detection
        })
        
    except Exception as e:
        print(f"❌ Error processing image: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

@app.route('/', methods=['GET'])
def index():
    """Root endpoint"""
    return jsonify({
        "name": "PawGuard AI - YOLO Backend",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "detect": "/detect (POST)"
        }
    })

if __name__ == '__main__':
    print("\n" + "="*50)
    print("🐾 PawGuard AI - YOLO Backend Server")
    print("="*50)
    print("✅ Server starting on http://localhost:5000")
    print("✅ Health check: http://localhost:5000/health")
    print("✅ Detection endpoint: POST http://localhost:5000/detect")
    print("="*50 + "\n")
    
    # Run the server
    app.run(
        host='0.0.0.0',  # Allow external connections
        port=5000,
        debug=True,
        threaded=True
    )
