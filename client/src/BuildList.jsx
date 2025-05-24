import { useEffect, useState } from 'react';

const BuildList = () => {
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuilds = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/builds');
        const data = await response.json();
        setBuilds(data);
      } catch (error) {
        console.error('Failed to fetch builds:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuilds();
  }, []);

  const deleteBuild = async (id) => {
    console.log('Deleting build with ID:', id); // add this
    try {
        const res = await fetch(`http://localhost:5000/api/builds/${id}`, {
        method: 'DELETE',
        });
        const result = await res.json();
        console.log('Server response:', result);

        if (res.ok) {
        setBuilds((prev) => prev.filter((b) => b._id !== id));
        }
    } catch (err) {
        console.error('Failed to delete build:', err);
    }
    };


  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Latest Hero Builds</h2>

      {loading ? (
        <p className="text-center">Loading builds...</p>
      ) : builds.length === 0 ? (
        <p className="text-center">No builds yet. Be the first to submit one!</p>
      ) : (
        <ul className="space-y-4">
          {builds.map((build) => (
  <li key={build._id} className="bg-white shadow-md rounded-md p-4">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-xl font-semibold text-blue-700">{build.title}</h3>
        <p className="text-sm text-gray-500 mb-1">
          Hero: <span className="font-medium">{build.hero}</span>
        </p>
      </div>
      <button
        onClick={() => deleteBuild(build._id)}
        className="text-red-500 hover:text-red-700 text-sm"
      >
        ✕ Delete
      </button>
    </div>

    <p className="text-gray-800 whitespace-pre-line">{build.description}</p>
    <p className="text-xs text-right text-gray-400 mt-2">
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
