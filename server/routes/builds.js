import express from 'express';
import { getBuilds, createBuild, deleteBuild } from '../controllers/buildController.js';

const router = express.Router();

// GET all builds
router.get('/', getBuilds);

// POST a new build
router.post('/', createBuild);

// DELETE an existing build
router.delete('/:id', deleteBuild);

export default router;
