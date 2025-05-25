import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirect to homepage if already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        onLogin({
          displayName: user.displayName,
          email: user.email,
          uid: user.uid,
          token,
        });
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate, onLogin]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      onLogin({
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        token,
      });
      navigate("/");
    } catch (err) {
      console.error("Google login failed:", err);
      setError("Google login failed.");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      onLogin({
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        token,
      });
      navigate("/");
    } catch (err) {
      console.error("Email login failed:", err);
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="max-w-sm mx-auto bg-slate-800 p-6 rounded-xl shadow space-y-6 mt-10">
      <h2 className="text-2xl font-bold text-white text-center">Log In</h2>

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />
        <button
          type="submit"
          className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition"
        >
          Log In with Email
        </button>
      </form>

      <div className="text-center text-slate-400">or</div>

      <button
        onClick={handleGoogleLogin}
        className="w-full py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition"
      >
        Sign in with Google
      </button>

      {error && <p className="text-red-400 text-center">❌ {error}</p>}
    </div>
  );
}
