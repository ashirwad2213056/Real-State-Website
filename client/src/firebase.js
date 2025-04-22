// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-state-312c9.firebaseapp.com",
  projectId: "real-state-312c9",
  storageBucket: "real-state-312c9.firebasestorage.app",
  messagingSenderId: "132295332924",
  appId: "1:132295332924:web:e8e812dc51e5c690241f39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

