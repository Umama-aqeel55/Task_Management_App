import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your actual Firebase config provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyBSpMpnr6HgW3adveQrdIW30htszBmsE94",
  authDomain: "real-time-chat-applicati-2342e.firebaseapp.com",
  databaseURL: "https://real-time-chat-applicati-2342e-default-rtdb.firebaseio.com",
  projectId: "real-time-chat-applicati-2342e",
  storageBucket: "real-time-chat-applicati-2342e.firebasestorage.app",
  messagingSenderId: "923853130091",
  appId: "1:923853130091:web:089e49d1747497250d242e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
