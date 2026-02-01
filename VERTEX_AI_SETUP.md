# PawGuard AI - Vertex AI Multimodal Embeddings Setup Guide

This guide will help you integrate **Google Vertex AI Multimodal Embeddings** into PawGuard AI for advanced animal similarity search.

---

## 📋 What You'll Achieve

- Generate 1408-dimension embeddings from animal images
- Store embeddings in Firestore for similarity search
- Enable "Find Similar Animals" feature
- Stay within $300 free GCP credits

---

## 🎯 Prerequisites Checklist

Before starting, ensure you have:

- [x] Google Cloud account (create at [console.cloud.google.com](https://console.cloud.google.com))
- [x] Firebase project: `pawguardai-4ee35`
- [x] Node.js installed (for Firebase Functions)
- [ ] GCP billing account set up (required for Vertex AI, but uses free $300 credits)

---

## 📝 What I Need From You

### Step 1: Enable Vertex AI API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project: `pawguardai-4ee35`
3. Navigate to **APIs & Services** → **Library**
4. Search for "Vertex AI API"
5. Click **Enable**

**Screenshot needed:** ✅ "Vertex AI API enabled" confirmation

---

### Step 2: Set Up Billing Alerts (IMPORTANT for cost protection)

1. In GCP Console, go to **Billing** → **Budgets & alerts**
2. Click **Create Budget**
3. Set these alerts:
   - Budget name: `PawGuard AI - Vertex AI`
   - Budget amount: `$50`
   - Alert thresholds: `50%`, `90%`, `100%`
4. Add your email for notifications

**This protects you from unexpected charges!**

---

### Step 3: Verify Firebase Functions Setup

Check if you already have Firebase Functions configured:

```bash
cd "d:\github clone\PawGuard_AI"
cd functions
npm install
```

**If the `functions` folder exists:** ✅ You're good!  
**If not:** I'll create it for you in the next step.

---

## 🚀 Implementation Steps (I'll Do These)

Once you complete Steps 1-3 above, I will:

### Step 4: Create Cloud Function for Embeddings

I'll create `functions/generateEmbedding.js` that:
- Accepts base64 image from your app
- Calls Vertex AI Multimodal Embeddings API
- Returns 1408-dimension vector

### Step 5: Update `animalService.ts`

I'll modify the service to:
- Call the Cloud Function when creating an animal report
- Store the embedding in Firestore
- Handle errors gracefully

### Step 6: Deploy and Test

I'll help you:
- Deploy the Cloud Function
- Test with a sample animal image
- Verify embeddings are stored correctly

---

## 💰 Cost Estimate

| Action | Cost per Call | Monthly Estimate (100 reports/day) |
|--------|---------------|-------------------------------------|
| Vertex AI Embedding | $0.0001 | $0.30/month |
| Cloud Function Execution | ~$0.000001 | ~$0.003/month |
| **Total** | **~$0.0001** | **~$0.30/month** |

**Your $300 credit will last:** ~1000 months (83+ years) at this rate! 🎉

---

## 📊 Architecture Overview

```
┌─────────────────┐
│  Expo App       │
│  (React Native) │
└────────┬────────┘
         │
         │ 1. Upload image + call function
         ▼
┌─────────────────────────┐
│  Firebase Cloud Function│
│  generateEmbedding()    │
└────────┬────────────────┘
         │
         │ 2. Send image to Vertex AI
         ▼
┌─────────────────────────┐
│  Vertex AI              │
│  Multimodal Embeddings  │
│  API                    │
└────────┬────────────────┘
         │
         │ 3. Return 1408-dim vector
         ▼
┌─────────────────────────┐
│  Firestore              │
│  animals/{id}           │
│  - embedding: [...]     │
└─────────────────────────┘
```

---

## 🔍 Next Steps

**Please complete Steps 1-3 above and let me know:**

1. ✅ "Vertex AI API is enabled"
2. ✅ "Billing alerts are set up"
3. ✅ "Firebase Functions folder exists" (or "Please create it")

Once confirmed, I'll implement Steps 4-6 automatically!

---

## 🆘 Troubleshooting

### "Billing account required"
- You need to add a payment method to GCP
- Don't worry: You have $300 free credits
- Set up billing alerts (Step 2) for protection

### "Permission denied"
- Make sure you're the owner of the GCP project
- Check that Vertex AI API is enabled

### "Functions folder not found"
- I'll create it for you - just let me know!

---

## 📚 Resources

- [Vertex AI Multimodal Embeddings Docs](https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-multimodal-embeddings)
- [Firebase Functions Docs](https://firebase.google.com/docs/functions)
- [GCP Free Tier](https://cloud.google.com/free)
