import { useState } from 'react';

const BuildForm = () => {
  const [hero, setHero] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const build = { hero, title, description };

    try {
      const response = await fetch('http://localhost:5000/api/builds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(build),
      });

      if (!response.ok) {
        throw new Error('Failed to submit build');
      }

      const data = await response.json();
      console.log('Build submitted:', data);
      setSuccess(true);
      setHero('');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
      setSuccess(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md space-y-4">
      <h2 className="text-2xl font-bold text-center">Submit a Hero Build</h2>

      <input
        type="text"
        placeholder="Hero"
        value={hero}
        onChange={(e) => setHero(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />

      <input
        type="text"
        placeholder="Build Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      />

      <textarea
        placeholder="Build Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      ></textarea>

      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Submit Build
      </button>

      {success === true && <p className="text-green-600 text-center">Build submitted successfully!</p>}
      {success === false && <p className="text-red-600 text-center">Failed to submit build.</p>}
    </form>
  );
};

export default BuildForm;
