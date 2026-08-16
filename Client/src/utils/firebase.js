import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "nayraai.firebaseapp.com",
    projectId: "nayraai",
    storageBucket: "nayraai.firebasestorage.app",
    messagingSenderId: "254224379748",
    appId: "1:254224379748:web:74569904b7c2acd2be9471",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
