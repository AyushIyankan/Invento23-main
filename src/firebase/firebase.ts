import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_API_KEY,
    projectId: import.meta.env.VITE_FIREBASE_API_KEY,
    storageBucket: import.meta.env.VITE_FIREBASE_API_KEY,
    messagingSenderId: import.meta.env.VITE_FIREBASE_API_KEY,
    appId: import.meta.env.VITE_FIREBASE_API_KEY,
    measurementId: import.meta.env.VITE_FIREBASE_API_KEY,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
