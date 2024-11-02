// src/controllers/gatewayController.ts
import { Request, Response } from 'express';
import { getProductsByBranchShortId } from '../service/productService';
//import { getUsersByBranchShortId } from '../services/userService';
//import { getBranchByShortId } from '../services/branchService';

export const getAllDataByBranchShortId = async (req: Request, res: Response) => {
  const { branchShortId } = req.params;

  try {
    const [products] = await Promise.all([
      getProductsByBranchShortId(branchShortId),
      //getUsersByBranchShortId(branchShortId),
      //getBranchByShortId(branchShortId),
    ]);

    res.json({ products });
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
};
