import { useState, useEffect } from "react";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { auth } from "./firebase";

import Login from "./Login";
import BuildForm from "./BuildForm";
import BuildList from "./BuildList";

import { signOut } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  const [builds, setBuilds] = useState([]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // clear local state
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Auto-restore login on page load
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
      console.log(firebaseUser);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <header className="text-center py-8">
        <h1 className="text-4xl font-bold text-orange-400">Hero Builds</h1>
        {user && (
          <div className="text-sm text-slate-300 flex items-center justify-center gap-4 mt-2">
            <span>Logged in as {user.displayName}</span>
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
        {!user ? (
          <Login onLogin={setUser} />
        ) : (
          <>
            <BuildForm
              user={user}
              onNewBuild={(newBuild) => setBuilds([newBuild, ...builds])}
            />
            <BuildList user={user} builds={builds} setBuilds={setBuilds} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
