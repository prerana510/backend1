// src/routes/gatewayRoutes.ts
import express from 'express';
import { getAllDataByBranchShortId } from '../controllers/gatewayControllers';

const router = express.Router();

// Endpoint to fetch all data by branchShortId
router.get('/branch/:branchShortId', getAllDataByBranchShortId);

export default router;
