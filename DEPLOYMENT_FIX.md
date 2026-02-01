# 🔧 Firebase Deployment Fix - Secret Manager Permission

## ❌ Current Error

```
PERMISSION_DENIED: secretmanager.secrets/GEMINI_API_KEY
```

**Root Cause:** `eavantan9@gmail.com` doesn't have permission to access Secret Manager secrets.

---

## ✅ Solution: Add Secret Manager Role

### Step 1: Add Secret Manager Secret Accessor Role

1. **Go to IAM:**  
   https://console.cloud.google.com/iam-admin/iam?project=pawguardai-4ee35

2. **Find `eavantan9@gmail.com`**

3. **Click the pencil icon** ✏️ to edit

4. **Click "ADD ANOTHER ROLE"**

5. **Search for and add:** `Secret Manager Secret Accessor`

6. **Click "SAVE"**

---

### Step 2: Enable Secret Manager API

1. **Go to:**  
   https://console.cloud.google.com/apis/library/secretmanager.googleapis.com?project=pawguardai-4ee35

2. **Click "ENABLE"**

---

### Step 3: Deploy Again

```powershell
firebase deploy --only functions:generateEmbedding
```

---

## 📋 Complete IAM Roles Needed for `eavantan9@gmail.com`

- [x] Owner
- [x] Cloud Functions Admin
- [x] Cloud Build Editor
- [x] Service Account User
- [ ] **Firebase Admin** ⬅️ Add this
- [ ] **Secret Manager Secret Accessor** ⬅️ Add this

---

## 🎯 Quick Links

- **IAM Page:** https://console.cloud.google.com/iam-admin/iam?project=pawguardai-4ee35
- **Secret Manager API:** https://console.cloud.google.com/apis/library/secretmanager.googleapis.com?project=pawguardai-4ee35
- **Firebase Admin API:** https://console.cloud.google.com/apis/library/firebase.googleapis.com?project=pawguardai-4ee35

---

## 🔍 Why This Happened

The `analyzeAnimal` Cloud Function uses `GEMINI_API_KEY` secret:

```javascript
const GEMINI_API_KEY = defineSecret("GEMINI_API_KEY");
```

When deploying, Firebase needs to:
1. Read the secret definition
2. Grant the function access to the secret
3. This requires **Secret Manager Secret Accessor** role

---

## ✅ After Adding Roles

Once you add both roles:
- Firebase Admin
- Secret Manager Secret Accessor

The deployment should succeed! 🎉
