import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";
import { useState } from "react";

export default function Login({ onLogin }) {
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      // Get the Firebase ID token
      const token = await result.user.getIdToken();

      // Build the user object
      const user = {
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        token,
      };

      // Send it to App state
      onLogin(user);
    } catch (err) {
      console.error("Login failed:", err);
      setError("Google sign-in failed.");
    }
  };

  return (
    <div className="text-center space-y-4">
      <button
        onClick={handleLogin}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
      >
        Sign in with Google
      </button>
      {error && <p className="text-red-400">{error}</p>}
    </div>
  );
}
