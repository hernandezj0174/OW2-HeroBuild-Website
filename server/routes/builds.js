import express from 'express';
import { getBuilds, createBuild, deleteBuild } from '../controllers/buildController.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// GET all builds (public)
router.get('/', getBuilds);

// POST a new build (requires auth)
router.post('/', verifyToken, createBuild);

// DELETE a build (we'll secure this in a later story)
router.delete('/:id', verifyToken, deleteBuild);

export default router;
