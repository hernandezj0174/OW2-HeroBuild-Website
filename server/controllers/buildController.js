import Build from '../models/HeroBuild.js';

// Get all builds
export const getBuilds = async (req, res) => {
  try {
    const builds = await Build.find().sort({ createdAt: -1 });
    res.json(builds);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new build
export const createBuild = async (req, res) => {
  const { hero, title, description } = req.body;

  if (!hero || !title || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newBuild = new Build({ hero, title, description });
    await newBuild.save();
    res.status(201).json(newBuild);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an existing build
export const deleteBuild = async (req, res) => {
  console.log('DELETE request received for ID:', req.params.id);

  const { id } = req.params;

  try {
    const deleted = await Build.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Build not found' });

    res.status(200).json({ message: 'Build deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
