# Google Cloud & Firebase Setup Guide
**Complete Reference for PawGuard AI**

---

## 📧 Account Information

| Account | Purpose | Status |
|---------|---------|--------|
| `evan17tan@gmail.com` | Google Cloud Owner | ✅ Full permissions |
| `eavantan9@gmail.com` | Firebase CLI (current) | ⚠️ Needs Firebase Admin role |
| `ravantan9@gmail.com` | Alternative account | ❌ No permissions yet |

**Current Issue:** `eavantan9@gmail.com` needs Firebase Admin role to deploy functions.

---

## 🔑 Required IAM Roles (Per Account)

Each account that deploys to Firebase needs these roles:

| Role Name | What It Does | Required For |
|-----------|--------------|--------------|
| **Owner** | Full project access | Everything |
| **Cloud Functions Admin** | Deploy/manage Cloud Functions | Deploying functions |
| **Cloud Build Editor** | Build function code | Function deployment |
| **Service Account User** | Use service accounts | Function execution |
| **Firebase Admin** | Manage Firebase resources | Firebase deployment |

### How to Add Roles:
1. Go to: https://console.cloud.google.com/iam-admin/iam?project=pawguardai-4ee35
2. Find your email or click "GRANT ACCESS"
3. Click pencil icon ✏️ to edit
4. Click "ADD ANOTHER ROLE" for each role above
5. Click "SAVE"

---

## 🔌 Required APIs (Enable Once Per Project)

These APIs need to be enabled for the `pawguardai-4ee35` project:

### 1. **Vertex AI API**
- **What:** AI/ML models for embeddings
- **Used For:** Generating 1408-dimension image embeddings
- **Enable:** https://console.cloud.google.com/apis/library/aiplatform.googleapis.com?project=pawguardai-4ee35
- **Status:** ✅ Enabled

### 2. **Cloud Functions API**
- **What:** Serverless function execution
- **Used For:** Running `generateEmbedding` function
- **Enable:** https://console.cloud.google.com/apis/library/cloudfunctions.googleapis.com?project=pawguardai-4ee35
- **Status:** ✅ Enabled

### 3. **Cloud Build API**
- **What:** Build and deploy code
- **Used For:** Building Cloud Functions during deployment
- **Enable:** https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=pawguardai-4ee35
- **Status:** ✅ Enabled

### 4. **Cloud Resource Manager API**
- **What:** Manage GCP project resources
- **Used For:** Accessing project metadata
- **Enable:** https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com?project=pawguardai-4ee35
- **Status:** ⏳ Need to enable

### 5. **Artifact Registry API**
- **What:** Store Docker images and artifacts
- **Used For:** Storing function build artifacts
- **Enable:** https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com?project=pawguardai-4ee35
- **Status:** ✅ Enabled

### 6. **Firebase Management API**
- **What:** Manage Firebase projects
- **Used For:** Firebase Admin SDK configuration
- **Enable:** https://console.cloud.google.com/apis/library/firebase.googleapis.com?project=pawguardai-4ee35
- **Status:** ⏳ Need to enable

---

## 🎯 Current Deployment Issue

**Error:** `403, The caller does not have permission`

**Root Cause:** `eavantan9@gmail.com` is missing the **Firebase Admin** role.

**Solution:**
1. Go to IAM: https://console.cloud.google.com/iam-admin/iam?project=pawguardai-4ee35
2. Find `eavantan9@gmail.com`
3. Click edit (pencil icon)
4. Add role: **Firebase Admin**
5. Click SAVE
6. Run: `firebase deploy --only functions:generateEmbedding`

---

## 📊 API vs IAM Roles - What's the Difference?

| Concept | Level | Explanation | Example |
|---------|-------|-------------|---------|
| **API** | Project | Features available to the project | "Can this project use Vertex AI?" |
| **IAM Role** | Account | What each person can do | "Can John deploy functions?" |

**Think of it like:**
- **APIs** = Tools in a toolbox (available to everyone on the project)
- **IAM Roles** = Permission to use those tools (who can pick them up)

---

## ✅ Quick Checklist

### For `eavantan9@gmail.com` (Current Account):

- [x] Owner role
- [ ] Firebase Admin role ⬅️ **ADD THIS NOW**
- [x] Cloud Functions Admin role
- [x] Cloud Build Editor role
- [x] Service Account User role

### For Project APIs:

- [x] Vertex AI API
- [x] Cloud Functions API
- [x] Cloud Build API
- [ ] Cloud Resource Manager API ⬅️ **ENABLE THIS**
- [x] Artifact Registry API
- [ ] Firebase Management API ⬅️ **ENABLE THIS**

---

## 🚀 Deployment Commands

```powershell
# Check who you're logged in as
firebase login

# Deploy the embedding function
firebase deploy --only functions:generateEmbedding

# Deploy all functions
firebase deploy --only functions

# View function logs
firebase functions:log
```

---

## 💰 Cost Summary

| Service | Free Tier | Cost After Free Tier |
|---------|-----------|---------------------|
| Vertex AI Embeddings | $300 credit | $0.0001 per image |
| Cloud Functions | 2M invocations/month | $0.40 per 1M |
| Cloud Build | 120 build-minutes/day | $0.003 per minute |
| Gemini 2.5 Flash | 15 RPM, 1,500 RPD | Free (no paid tier yet) |

**Estimated Monthly Cost:** $0.30 - $3.00 (for 100-1000 reports/day)

---

## 🆘 Common Errors & Solutions

### Error: "403, The caller does not have permission"
**Solution:** Add missing IAM roles (see checklist above)

### Error: "API not enabled"
**Solution:** Enable the API in Google Cloud Console

### Error: "Already logged in as [wrong email]"
**Solution:** Run `firebase logout` then `firebase login`

### Error: "Runtime Node.js 20 will be deprecated"
**Solution:** This is just a warning, safe to ignore for now

---

## 📞 Support Links

- **Firebase Console:** https://console.firebase.google.com/project/pawguardai-4ee35
- **Google Cloud Console:** https://console.cloud.google.com/home/dashboard?project=pawguardai-4ee35
- **IAM Permissions:** https://console.cloud.google.com/iam-admin/iam?project=pawguardai-4ee35
- **API Library:** https://console.cloud.google.com/apis/library?project=pawguardai-4ee35

---

**Last Updated:** 2026-02-01  
**Project:** pawguardai-4ee35  
**Current Account:** eavantan9@gmail.com
