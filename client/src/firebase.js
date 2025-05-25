import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ow2-herobuilds-website.firebaseapp.com",
  projectId: "ow2-herobuilds-website",
  appId: "1:873368193940:web:1734f7fb595766fe811d81",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
