import { Request, Response } from 'express';
import Inventory from '../models/inventoryModel';
import { getProductsByBrand } from '../service/inventoryService';

export const fetchProductsByBrand = async (req: Request, res: Response) => {
  const { brandName } = req.query;

  if (!brandName) {
    return res.status(400).json({ message: 'Brand name is required' });
  }

  try {
    const response = await getProductsByBrand(brandName as string);
    return res.json(response);
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create Inventory Item
export const createInventory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { inventoryId, branchShortId, brandName } = req.body;
    const newInventory = new Inventory({ inventoryId, branchShortId, brandName });
    await newInventory.save();
    res.status(201).json(newInventory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating inventory', error });
  }
};

// Get Inventory by Branch shortId for Business Retailers
export const getInventoryByShortId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { shortId } = req.params;
    const inventoryItems = await Inventory.find({ branchShortId: shortId }).populate('productId'); // Assuming product data is populated from Product model
    if (!inventoryItems || inventoryItems.length === 0) {
      res.status(404).json({ message: 'Inventory not found for this branch' });
    } else {
      res.json(inventoryItems);
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inventory', error });
  }
};
