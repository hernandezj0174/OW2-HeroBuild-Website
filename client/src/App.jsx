import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { onAuthStateChanged, getIdToken, signOut } from "firebase/auth";

import { auth } from "./firebase";
import Login from "./Login";
import Register from "./Register";
import BuildForm from "./BuildForm";
import BuildList from "./BuildList";

function App() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Watch Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        setUser({
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          token,
        });
      } else {
        setUser(null);
      }
      setAuthChecked(true);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-orange-400">Hero Builds</h1>
        {user && (
          <div className="text-sm text-slate-300 flex items-center justify-center gap-4 mt-2">
            <span>
              Logged in as <strong>{user.displayName || user.email}</strong>
            </span>
            <button
              onClick={handleLogout}
              className="text-orange-400 hover:text-orange-500 underline"
            >
              Log out
            </button>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 space-y-10 pb-20">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <BuildList user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/submit"
            element={
              user ? (
                <BuildForm user={user} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/register"
            element={<Register onLogin={handleLogin} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
