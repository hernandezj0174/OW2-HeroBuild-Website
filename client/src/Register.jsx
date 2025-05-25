import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function Register({ onLogin }) {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();

      onLogin({
        displayName: result.user.displayName,
        email: result.user.email,
        uid: result.user.uid,
        token,
      });

      setSuccess(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-slate-700 p-6 rounded-xl shadow space-y-4 w-full max-w-sm mx-auto flex flex-col"
    >
      <h2 className="text-2xl font-bold text-white text-center">Register</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <button
        type="submit"
        className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition"
      >
        Register
      </button>

      {success && <p className="text-green-400 text-center">✅ Account created!</p>}
      {error && <p className="text-red-400 text-center">❌ {error}</p>}
    </form>
  );
}
