

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0iX3_WgnTA3xj-IGQrLC93WMBWyJIA70",
  authDomain: "chatapp-18702.firebaseapp.com",
  databaseURL: "https://chatapp-18702-default-rtdb.firebaseio.com",
  projectId: "chatapp-18702",
  storageBucket: "chatapp-18702.firebasestorage.app",
  messagingSenderId: "225061772347",
  appId: "1:225061772347:web:440f373a01c5ac4362d01e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getDatabase(app);
