PawGuard AI: Comprehensive Google Technology Implementation Plan

This document outlines a detailed implementation plan to modernize the PawGuard AI project by migrating its core functionalities to Google Cloud and Firebase technologies. The primary objectives are to leverage Gemini 2.5 Flash for animal detection, replace CLIP with Google Multimodal Embeddings, integrate Firebase for data storage, and enable editable Google Maps for user location reporting, all while strictly adhering to free tier limits to avoid unexpected costs.




1. Overall Project Goal

To analyze the PawGuard_AI repository and create a detailed implementation plan to migrate to Google technologies (Gemini 2.5 Flash, Google embeddings, Firebase Storage, Google Maps editing) while staying within free tier limits.




2. Core Technology Stack (Free Tier Optimized)

Component
Current Technology
New Google Technology
Free Tier Limit (Approx.)
Animal Detection
CLIP / Custom Model
Gemini 2.5 Flash
15 RPM, 1M TPM, 1,500 RPD 

Embeddings
Multimodal Embeddings API (Vertex AI)
$300 trial credit / ~$0.0001 per image 

Storage
Local / Other
Firebase Storage
5 GB Total, 1 GB/day download 

Database
Local / Other
Cloud Firestore
1 GB Total, 50k reads/day 

Maps & Location
Static / None
Google Maps JS API
28,500 loads/month (Free Cap) 








3. Phase 1: Environment Setup & Authentication

This phase focuses on setting up your Google environment and understanding the different API keys.

3.1 Google AI Studio (Gemini API Key)

1.
Go to Google AI Studio.

2.
Create a new API Key. This will be your GOOGLE_AI_KEY.

3.
Crucially: This single GOOGLE_AI_KEY will be used for both Gemini detection and Vertex AI Multimodal Embeddings, provided the necessary APIs are enabled in the associated Google Cloud Project.

3.2 Google Cloud Project Configuration

1.
Go to the Google Cloud Console and select the project linked to your Google AI Studio API key.

2.
Enable APIs: Navigate to "APIs & Services" > "Library" and enable the following APIs:

•
Generative Language API: Essential for Gemini 2.5 Flash.

•
Vertex AI API: Required for Multimodal Embeddings.

•
Maps JavaScript API: For displaying interactive maps.

•
Geocoding API: For converting coordinates to human-readable addresses.



3.
API Key Restrictions: Go to "APIs & Services" > "Credentials". Find your GOOGLE_AI_KEY and ensure it is set to "Don't restrict key" (for simplicity during development) or explicitly restricted to the APIs listed above.

3.3 Firebase Project Setup

1.
Create a project in the Firebase Console.

2.
Enable Cloud Firestore (start in Test Mode for quick setup).

3.
Enable Cloud Storage for Firebase.

4.
Register your web or mobile app to obtain the firebaseConfig object. This object contains an apiKey which is distinct from your GOOGLE_AI_KEY and is used for Firebase client-side operations.

3.4 .env File Configuration

Your .env file should look like this:

Plain Text


# .env file for PawGuard AI

# This is the API key obtained from Google AI Studio.
# It will be used for both Gemini API (detection) and Vertex AI (embeddings)
# provided the necessary APIs are enabled in your GCP project.
GOOGLE_AI_KEY="YOUR_API_KEY_FROM_GOOGLE_AI_STUDIO"

# Your Google Cloud Project ID is needed for Vertex AI initialization.
# You can find this in your Google Cloud Console dashboard.
VERTEX_AI_PROJECT_ID="your-gcp-project-id"

# The region for Vertex AI. "us-central1" is a common choice.
VERTEX_AI_LOCATION="us-central1"

# (Optional) Google Maps API Key. This is typically a separate key from Google Cloud Console,
# restricted to your domain for security. It's used client-side for the map.
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"

# (Optional) Firebase configuration details. These are typically part of your client-side setup
# or handled by a service account JSON for server-side operations.
# FIREBASE_API_KEY="your-firebase-web-api-key" # This is different from GOOGLE_AI_KEY
# FIREBASE_PROJECT_ID="your-firebase-project-id"
# FIREBASE_AUTH_DOMAIN="your-firebase-auth-domain"
# FIREBASE_STORAGE_BUCKET="your-firebase-storage-bucket"
# FIREBASE_MESSAGING_SENDER_ID="your-firebase-messaging-sender-id"
# FIREBASE_APP_ID="your-firebase-app-id"






4. Phase 2: AI Migration (Detection & Embeddings)

This phase details the code changes required to integrate Gemini and Google Multimodal Embeddings.

4.1 Replace CLIP with Gemini 2.5 Flash for Animal Detection

Issue: Your previous error showed usage of gemini-2.0-flash-exp, an experimental model that causes 404 Not Found errors. gemini-2.5-flash is the stable, free-tier friendly alternative.

Prerequisites:

Bash


pip install -q -U google-generativeai



Implementation (Python):

Python


import google.generativeai as genai
import PIL.Image
import os

# Configure your API Key from Google AI Studio
genai.configure(api_key=os.getenv("GOOGLE_AI_KEY"))

def detect_animal_with_gemini(image_path):
    """
    Uses Gemini 2.5 Flash to detect animals and provide a detailed report.
    """
    # Use the stable model: gemini-2.5-flash
    model = genai.GenerativeModel("gemini-2.5-flash") 
    
    img = PIL.Image.open(image_path)
    
    prompt = (
        "Analyze this image for PawGuard AI. "
        "1. Identify the animal species. "
        "2. Describe its current condition (healthy, injured, stray, etc.). "
        "3. Assess any immediate danger to the animal or public. "
        "4. Provide a short summary for a rescue report."
    )
    
    response = model.generate_content([prompt, img])
    
    return response.text



Implementation (JavaScript/TypeScript - if applicable to your frontend):

Look for the model initialization in your geminiService.ts (or similar) file and update it:

TypeScript


// OLD (Causes 404)
// const model = genai.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

// NEW (Correct)
const model = genai.getGenerativeModel({ model: 'gemini-2.5-flash' });



4.2 Replace CLIP Embeddings with Google Multimodal Embeddings

Use Vertex AI's Multimodal Embeddings to generate vectors for search and similarity. This is covered by the Google Cloud $300 trial credit, which is substantial for free-tier usage.

Prerequisites:

Bash


pip install -q -U google-cloud-aiplatform



Implementation (Python):

Python


from vertexai.vision_models import MultiModalEmbeddingModel, Image
import vertexai
import os

# Initialize Vertex AI with your Project ID and Region from .env
vertexai.init(
    project=os.getenv("VERTEX_AI_PROJECT_ID"), 
    location=os.getenv("VERTEX_AI_LOCATION")
)

def get_google_multimodal_embedding(image_path=None, text=None):
    """
    Generates a 1408-dimension embedding vector for an image or text.
    Replaces CLIP for semantic search and similarity.
    """
    model = MultiModalEmbeddingModel.from_pretrained("multimodalembedding@001")
    
    image = None
    if image_path:
        image = Image.load_from_file(image_path)
    
    # Generate embeddings
    embeddings = model.get_embeddings(
        image=image,
        context_text=text
    )
    
    # Return the vector (list of floats)
    return embeddings.image_embedding if image else embeddings.text_embedding






5. Phase 3: Location & Mapping Integration

5.1 Editable Google Map for Reports

Allow users to drag a marker to refine their location if GPS is inaccurate.

Frontend Implementation (JavaScript):

1.
Initialize a map centered at the user's current GPS coordinates.

2.
Place a Draggable Marker.

3.
Listen for the dragend event to update the report's latitude and longitude.

JavaScript


// Ensure you load the Google Maps JavaScript API with your GOOGLE_MAPS_API_KEY
// <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap"></script>

function initMap( ) {
    const userCoords = { lat: 37.7749, lng: -122.4194 }; // Replace with actual user GPS
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: userCoords,
    });

    let marker = new google.maps.Marker({
        position: userCoords,
        map: map,
        draggable: true,
    });

    marker.addListener("dragend", function() {
        let newPos = marker.getPosition();
        // Call a function in your app to update the report location
        updateReportLocation(newPos.lat(), newPos.lng());
    });
}

function updateReportLocation(lat, lng) {
    console.log(`New location: Lat ${lat}, Lng ${lng}`);
    // Here, you would typically update your application's state or form fields
    // and then use Reverse Geocoding to get a human-readable address.
}



5.2 Reverse Geocoding

Use the Geocoding API to convert the marker's coordinates into a human-readable address for the report.

JavaScript


// This would be called within your updateReportLocation function or similar
function getAddressFromLatLng(lat, lng) {
    const geocoder = new google.maps.Geocoder();
    const latlng = { lat: lat, lng: lng };

    geocoder.geocode({ location: latlng }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                console.log("Address: ", results[0].formatted_address);
                // Update your report data with the formatted address
            } else {
                console.log("No results found");
            }
        } else {
            console.error("Geocoder failed due to: " + status);
        }
    });
}






6. Phase 4: Data Persistence (Firebase)

6.1 Firebase Storage for Media

Upload the captured image to Firebase Storage and retrieve its public download URL.

Implementation (Python - for backend upload, or adapt for client-side JS):

Python


import firebase_admin
from firebase_admin import credentials, storage
import os

# Initialize Firebase Admin SDK (if not already done)
# Make sure to download your Firebase service account key JSON file
# and set the path in an environment variable or directly here.
# cred = credentials.Certificate(os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH"))
# firebase_admin.initialize_app(cred, {
#     'storageBucket': 'your-firebase-project-id.appspot.com'
# })

def upload_image_to_firebase_storage(local_file_path, destination_blob_name):
    """
    Uploads a file to Firebase Storage and returns its public URL.
    """
    bucket = storage.bucket()
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(local_file_path)
    
    # Make the blob publicly viewable. You might want to add security rules in Firebase Storage.
    blob.make_public()
    
    return blob.public_url

# Example Usage:
# image_url = upload_image_to_firebase_storage("path/to/local/image.jpg", "animal_reports/image_timestamp.jpg")
# print(image_url)



6.2 Clean Firestore Database Structure

Store the report metadata in a structured format in Cloud Firestore.

Implementation (Python - for backend, or adapt for client-side JS):

Python


import firebase_admin
from firebase_admin import credentials, firestore
import datetime
import os

# Initialize Firebase Admin SDK (if not already done)
# cred = credentials.Certificate(os.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH"))
# firebase_admin.initialize_app(cred)

db = firestore.client()

def save_animal_report_to_firestore(report_data):
    """
    Saves an animal report document to the 'reports' collection in Firestore.
    """
    reports_ref = db.collection('reports')
    report_data['timestamp'] = firestore.SERVER_TIMESTAMP # Use server timestamp
    reports_ref.add(report_data)
    print("Report saved to Firestore.")

# Example Usage:
# report_example = {
#     "userId": "user_123",
#     "animalType": "Dog",
#     "status": "Injured",
#     "imageUrl": "https://firebasestorage.googleapis.com/...",
#     "embedding": [0.12, -0.05, 0.88, ...], # The 1408-dim vector
#     "location": {
#         "lat": 37.7749,
#         "lng": -122.4194,
#         "address": "123 Market St, San Francisco"
#     }
# }
# save_animal_report_to_firestore(report_example )



Collection: reports (Example Document Structure)

JSON


{
    "userId": "user_123",
    "timestamp": "2026-02-01T12:00:00Z",
    "animalType": "Dog",
    "status": "Injured",
    "imageUrl": "https://firebasestorage...",
    "embedding": [0.12, -0.05, ...], // The 1408-dimension vector
    "location": {
        "lat": 37.7749,
        "lng": -122.4194,
        "address": "123 Market St, San Francisco"
    }
}






7. Execution Checklist for an AI Assistant (Claude/Gemini 3 Pro )

To execute this plan, provide the following instructions to your AI assistant:

1.
Refactor detection.py (or equivalent): Remove existing CLIP dependencies. Integrate the google-generativeai SDK. Update the model name to gemini-2.5-flash for image analysis.

2.
Update storage_manager.py (or equivalent): Replace local file saving with Firebase Storage upload_blob functionality. Ensure the public URL is retrieved.

3.
Database Migration: Create a service to push detection results, image URLs, embedding vectors, and location data to Cloud Firestore. Ensure proper data structure as outlined.

4.
Frontend Map Component: Create/modify a React/Vue/Angular component that renders a Google Map with a draggable marker. Bind the marker's dragend event to update the report form state and trigger reverse geocoding.

5.
Cost Optimization: Implement caching where possible. Ensure Gemini API calls are minimized (e.g., one call per report). Monitor Google Cloud billing alerts.

6.
Error Handling: Implement robust error handling for all API calls (Gemini, Vertex AI, Google Maps, Firebase) to gracefully manage network issues or API limits.




8. Cost Management Tips (Reiterated)

•
Gemini API: Stick to gemini-2.5-flash. Monitor your usage in Google AI Studio to stay within the 15 RPM / 1,500 RPD free limits.

•
Vertex AI Multimodal Embeddings: Utilize the $300 Google Cloud Free Trial credit. For long-term free usage, consider generating text descriptions with Gemini and then using the free text-embedding-004 model from Google AI Studio if multimodal embeddings become too costly after the trial.

•
Firebase: The Spark Plan offers generous free tiers for Firestore (1GB storage, 50k reads/day) and Storage (5GB storage, 1GB/day download). Monitor your usage in the Firebase Console.

•
Google Maps Platform: The platform provides a recurring $200 monthly credit. Monitor your usage in the Google Cloud Console and set budget alerts to prevent unexpected charges.

•
Budget Alerts: Always set up budget alerts in the Google Cloud Console to notify you if your spending approaches a certain threshold.




References

[1] Rate limits | Gemini API - Google AI for Developers
[2] Vertex AI Pricing | Google Cloud
[3] Firebase Pricing - Google
[4] Usage and limits | Firestore - Firebase - Google
[5] Google Maps Platform pricing overview | Pricing and Billing
