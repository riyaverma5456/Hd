

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "AIzaSyAYXph_f0gT7Rq_BTTa3BZCal1H6erFaKo",
//   authDomain: "taskhdfront.firebaseapp.com",
//   databaseURL: "https://taskhdfront-default-rtdb.firebaseio.com", // ✅ Realtime DB
//   projectId: "taskhdfront",
//   storageBucket: "taskhdfront.appspot.com", // ✅ fixed
//   messagingSenderId: "574505286819",
//   appId: "1:574505286819:web:066e320c357b6ae3fa5316",
// };

// const app = initializeApp(firebaseConfig);



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
