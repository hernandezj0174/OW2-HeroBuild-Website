import { useEffect, useState } from "react";

const BuildList = ({ user, builds, setBuilds }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/builds");
        const data = await response.json();
        setBuilds(data);
      } catch (error) {
        console.error("Failed to fetch builds:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  const deleteBuild = async (id) => {
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:5000/api/builds/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete build");
      }

      setBuilds((prevBuilds) => prevBuilds.filter((build) => build._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      setError(err.message || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Latest Hero Builds
      </h2>

      {error && <p className="text-red-400 text-center mb-4">❌ {error}</p>}

      {loading ? (
        <p className="text-center">Loading builds...</p>
      ) : builds.length === 0 ? (
        <p className="text-center">
          No builds yet. Be the first to submit one!
        </p>
      ) : (
        <ul className="space-y-4">
          {builds.map((build) => (
            <li key={build._id} className="...">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-orange-300">
                    {build.title}
                  </h3>
                  <p className="text-sm text-slate-300">
                    Hero:{" "}
                    <span className="font-medium text-white">{build.hero}</span>
                  </p>
                </div>

                {/* ✅ Show delete button only if user is owner */}
                {user?.uid === build.userId && (
                  <button
                    onClick={() => deleteBuild(build._id)}
                    className="text-red-400 hover:text-red-500 text-sm px-2"
                  >
                    ✕
                  </button>
                )}
              </div>

              <p className="text-slate-100 mt-3 whitespace-pre-line">
                {build.description}
              </p>
              <p className="text-xs text-right text-slate-400 mt-2">
                {new Date(build.createdAt).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BuildList;
