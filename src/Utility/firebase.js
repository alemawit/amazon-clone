// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app"; // Correct import for initializing Firebase
import { getAuth } from "firebase/auth"; // Correct import for Firebase Auth
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "clone-3ed40.firebaseapp.com",
  projectId: "clone-3ed40",
  storageBucket: "clone-3ed40.firebasestorage.app",
  messagingSenderId: "1017611949236",
  appId: "1:1017611949236:web:39dd3fff45d0117d98f3e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize the Firebase app with the configuration

// Initialize Firebase services
export const auth = getAuth(app); // Initialize Firebase Auth
export const db = getFirestore(app); // Initialize Firestore
