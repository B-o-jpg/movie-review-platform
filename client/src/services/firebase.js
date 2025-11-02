// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAnvAxU2LTWDUoPX4kzG0mTG1v5Unh388",
  authDomain: "movie-review-platform-4449e.firebaseapp.com",
  projectId: "movie-review-platform-4449e",
  storageBucket: "movie-review-platform-4449e.firebasestorage.app",
  messagingSenderId: "773378487428",
  appId: "1:773378487428:web:27bf7e66a407ff877bfed1",
  measurementId: "G-MTDFJCGKLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only run analytics if supported (avoids “window is not defined” errors)
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

// Export Firestore for your app to use
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;
