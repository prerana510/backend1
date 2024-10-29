import express from 'express';
import {
    createBranch,
    getBranchById,
    getBranchByShortId,
    getAllBranches,
    updateBranchById,
    updateBranchByShortId,
    deleteBranchById,
    deleteBranchByShortId,
} from '../controllers/branchController';

const router = express.Router();

// Create a branch
router.post('/', createBranch);

// Get all branches
router.get('/', getAllBranches);

// Get a branch by ID
router.get('/:id', getBranchById);

// Get a branch by shortId
router.get('/shortId/:shortId', getBranchByShortId);

// Update a branch by ID
router.put('/:id', updateBranchById);

// Update a branch by shortId
router.put('/shortId/:shortId', updateBranchByShortId);

// Delete a branch by ID
router.delete('/:id', deleteBranchById);

// Delete a branch by shortId
router.delete('/shortId/:shortId', deleteBranchByShortId);

export default router;
