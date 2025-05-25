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

// Create a new build (requires authentication)
export const createBuild = async (req, res) => {
  const { hero, title, description } = req.body;

  if (!req.user || !req.user.uid) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  if (!hero || !title || !description) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newBuild = new Build({
      hero,
      title,
      description,
      userId: req.user.uid,
    });

    await newBuild.save();
    res.status(201).json(newBuild);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBuild = async (req, res) => {
  const { id } = req.params;

  try {
    const build = await Build.findById(id);

    if (!build) {
      return res.status(404).json({ error: "Build not found" });
    }

    // 🔐 OWNER CHECK
    if (build.userId !== req.user.uid) {
      return res.status(403).json({ error: "Forbidden: Not the build owner" });
    }

    await build.deleteOne();
    res.status(200).json({ message: "Build deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};