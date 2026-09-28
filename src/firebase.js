import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARDa-aB61_IdEYZ8QTgyKdrFJ4MEfx25s",
  authDomain: "project-react-41e50.firebaseapp.com",
  projectId: "project-react-41e50",
  storageBucket: "project-react-41e50.firebasestorage.app",
  messagingSenderId: "609672749962",
  appId: "1:609672749962:web:6e15a10ba7cbd41b835e73",
  measurementId: "G-L074QL1LY5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics conditionally
export let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {});
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
};
