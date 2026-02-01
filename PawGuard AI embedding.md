# PawGuard AI - Google Technology Integration Guide

Complete guide for migrating PawGuard AI to Google Cloud technologies.

---

## 📊 Technology Stack Overview

| Component | Current | New Technology | Free Tier Limit |
|-----------|---------|----------------|-----------------|
| **Animal Detection** | CLIP/Custom | **Gemini 2.5 Flash** | 15 RPM, 1M TPM, 1,500 RPD |
| **Embeddings** | CLIP | **Vertex AI Multimodal** | $300 trial credit |
| **Storage** | Local | **Firebase Storage** | 5 GB, 1 GB/day download |
| **Database** | Local | **Cloud Firestore** | 1 GB, 50k reads/day |
| **Maps** | Static | **Google Maps API** | 28,500 loads/month |

---

## 🎯 Phase 1: Environment Setup ✅

### 1.1 Google AI Studio (Gemini)
- ✅ API Key created and saved as `GOOGLE_AI_KEY`
- ✅ Gemini 2.5 Flash enabled

### 1.2 Firebase Project
- ✅ Project: `pawguardai-4ee35`
- ✅ Firestore Database enabled
- ✅ Firebase Storage enabled
- ✅ Configuration in `services/firebase.ts`

### 1.3 Google Maps Platform
- ✅ Maps JavaScript API enabled
- ✅ API Key configured in `app.json`

---

## 🤖 Phase 2: Gemini AI Integration ✅

### 2.1 Animal Detection Implementation

**File:** [`services/geminiService.ts`](file:///d:/github%20clone/PawGuard_AI/services/geminiService.ts)

**Features:**
- Detects animals (dog, cat, other)
- Analyzes health status
- Provides detailed descriptions
- Returns confidence scores

**Usage:**
```typescript
import { geminiService } from './services/geminiService';

const result = await geminiService.detectAnimals(imageUri);
// Returns: { success, animalType, species, healthStatus, confidence, description }
```

### 2.2 Integration Status
- ✅ SDK installed: `@google/generative-ai`
- ✅ Service created: `geminiService.ts`
- ✅ Screen updated: `AIReportCameraScreen.tsx`
- ✅ Cloud Function dependency removed

---

## 🔍 Phase 3: Vertex AI Embeddings (In Progress)

### 3.1 What Are Embeddings?

**Embeddings** convert images into numerical vectors that capture visual meaning:

```
Image → [0.23, -0.45, 0.78, ..., 0.12] (1408 numbers)
```

**Use Cases:**
- Find similar animals by appearance
- Search by visual features
- Identify potential matches for lost pets

### 3.2 Implementation Architecture

```
┌──────────────┐
│  Expo App    │ → Upload image
└──────┬───────┘
       │
       ▼
┌──────────────────┐
│ Cloud Function   │ → Call Vertex AI
│ generateEmbedding│
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Vertex AI API    │ → Generate 1408-dim vector
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Firestore        │ → Store embedding
│ animals/{id}     │
└──────────────────┘
```

### 3.3 Setup Required

**See:** [`VERTEX_AI_SETUP.md`](file:///d:/github%20clone/PawGuard_AI/VERTEX_AI_SETUP.md) for detailed instructions.

**Quick Checklist:**
1. [ ] Enable Vertex AI API in GCP Console
2. [ ] Set up billing alerts ($50 budget recommended)
3. [ ] Verify Firebase Functions setup
4. [ ] Deploy embedding Cloud Function
5. [ ] Test with sample image

---

## 📍 Phase 4: Location & Mapping

### 4.1 Editable Google Maps

**File:** [`screens/ReportSightingScreen.tsx`](file:///d:/github%20clone/PawGuard_AI/screens/ReportSightingScreen.tsx)

**Features:**
- ✅ Real-time GPS location detection
- ✅ Interactive map preview
- ✅ Manual address editing
- ✅ Reverse geocoding

**Implementation:**
```typescript
<MapView
  region={{
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  }}
>
  <Marker coordinate={location} />
</MapView>
```

---

## 💾 Phase 5: Firebase Data Persistence

### 5.1 Firestore Structure

**Collection:** `animals`

```json
{
  "id": "DOG-20260201-ABC123",
  "systemId": "DOG-20260201-ABC123",
  "species": "dog",
  "breed": "Golden Retriever",
  "color": "Golden",
  "healthStatus": "healthy",
  "imageUrl": "https://firebasestorage.googleapis.com/...",
  "embedding": [0.12, -0.05, 0.78, ...], // 1408 dimensions
  "location": {
    "lat": 3.1390,
    "lng": 101.6869,
    "address": "Kuala Lumpur, Malaysia"
  },
  "reporter": {
    "userId": "user123",
    "userName": "John Doe"
  },
  "timestamp": "2026-02-01T10:00:00Z",
  "reports": [
    {
      "id": "report1",
      "reporterId": "user123",
      "condition": "healthy",
      "notes": "Friendly dog, well-fed",
      "timestamp": "2026-02-01T10:00:00Z"
    }
  ]
}
```

### 5.2 Storage Structure

```
animals/
  ├── DOG-20260201-ABC123/
  │   └── profile.jpg
  └── CAT-20260201-XYZ789/
      └── profile.jpg
```

---

## 💰 Cost Management

### Free Tier Limits

| Service | Limit | Current Usage | Status |
|---------|-------|---------------|--------|
| Gemini API | 15 RPM, 1,500 RPD | ~10 RPD | ✅ Safe |
| Firebase Storage | 5 GB total | ~500 MB | ✅ Safe |
| Firestore | 50k reads/day | ~1k/day | ✅ Safe |
| Google Maps | 28,500 loads/month | ~300/month | ✅ Safe |
| Vertex AI | $300 credit | $0 | ✅ Safe |

### Cost Protection Measures

1. **Gemini API:**
   - Single call per image
   - No retry loops
   - Error handling prevents waste

2. **Firebase Storage:**
   - Compress images before upload
   - Set lifecycle rules (delete old reports)

3. **Vertex AI:**
   - Set billing alerts at $5, $10, $50
   - Monitor usage in GCP Console
   - Estimated cost: $0.30/month (100 reports/day)

---

## 📋 Implementation Checklist

### Completed ✅
- [x] Set up Google AI Studio API key
- [x] Configure Firebase project
- [x] Install Gemini SDK
- [x] Create `geminiService.ts`
- [x] Update `AIReportCameraScreen.tsx`
- [x] Test animal detection

### In Progress 🔄
- [/] Enable Vertex AI API
- [/] Set up billing alerts
- [/] Create embedding Cloud Function

### Pending ⏳
- [ ] Deploy embedding function
- [ ] Update `animalService.ts`
- [ ] Test embedding generation
- [ ] Implement similarity search

---

## 🚀 Next Steps

**For User:**
1. Enable Vertex AI API (see [`VERTEX_AI_SETUP.md`](file:///d:/github%20clone/PawGuard_AI/VERTEX_AI_SETUP.md))
2. Set up billing alerts
3. Confirm Firebase Functions setup

**For Implementation:**
1. Create Cloud Function for embeddings
2. Update animal service
3. Test and verify
4. Deploy to production

---

## 📚 Resources

- [Gemini API Docs](https://ai.google.dev/docs)
- [Vertex AI Embeddings](https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-multimodal-embeddings)
- [Firebase Functions](https://firebase.google.com/docs/functions)
- [Firestore Vector Search](https://firebase.google.com/docs/firestore/vector-search)

---

## 🆘 Support

**Issues?** Check:
1. Environment variables are set
2. APIs are enabled in GCP Console
3. Billing is set up (for Vertex AI)
4. Firebase configuration is correct

**Still stuck?** Review the setup guides:
- [`VERTEX_AI_SETUP.md`](file:///d:/github%20clone/PawGuard_AI/VERTEX_AI_SETUP.md)
- [`walkthrough.md`](file:///C:/Users/User/.gemini/antigravity/brain/bc2185ba-660e-4976-80e1-fcfd991548cf/walkthrough.md)