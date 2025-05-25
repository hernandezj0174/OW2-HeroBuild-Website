import { useState } from "react";

const BuildForm = ({ user, onNewBuild }) => {
  const [hero, setHero] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const build = { hero, title, description };

    try {
      const response = await fetch("http://localhost:5000/api/builds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`, // ✅ Send the Firebase token
        },
        body: JSON.stringify(build),
      });

      if (!response.ok) {
        throw new Error("Failed to submit build");
      }

      const data = await response.json();
      console.log("Build submitted:", data);
      setSuccess(true);
      setHero("");
      setTitle("");
      setDescription("");

      onNewBuild(data);
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-700 p-6 rounded-xl shadow space-y-4 w-full max-w-xl mx-auto flex flex-col"
    >
      <h2 className="text-2xl font-bold text-white text-center">
        Submit a Stadium Build
      </h2>

      <input
        type="text"
        placeholder="Hero"
        value={hero}
        onChange={(e) => setHero(e.target.value)}
        className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <input
        type="text"
        placeholder="Build Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      />

      <textarea
        placeholder="Build Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 h-32 rounded bg-slate-800 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        required
      ></textarea>

      <button
        type="submit"
        className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded transition"
      >
        Submit Build
      </button>

      {success === true && (
        <p className="text-green-400 text-center">✅ Build submitted!</p>
      )}
      {success === false && (
        <p className="text-red-400 text-center">❌ Submission failed.</p>
      )}
    </form>
  );
};

export default BuildForm;
