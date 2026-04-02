import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "ai-app-study-attendance",
  appId: "1:133306405687:web:11df2d81d21cfd9b9300b2",
  storageBucket: "ai-app-study-attendance.firebasestorage.app",
  apiKey: "AIzaSyCVH_vos-Mfz108z84FnLiUUMXA46ACPQU",
  authDomain: "ai-app-study-attendance.firebaseapp.com",
  messagingSenderId: "133306405687",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
