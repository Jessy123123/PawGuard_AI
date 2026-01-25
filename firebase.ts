import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1ozEAKJcBdy4N3rr3QmwsqJIdAAwQyAo",
    authDomain: "pawguardai-4ee35.firebaseapp.com",
    projectId: "pawguardai-4ee35",
    storageBucket: "pawguardai-4ee35.firebasestorage.app",
    messagingSenderId: "906596802029",
    appId: "1:906596802029:web:58f01d241932ef8459dbe4",
    measurementId: "G-G5MJFJQ34D"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
