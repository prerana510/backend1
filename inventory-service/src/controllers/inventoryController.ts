import { Request, Response } from 'express';
import Inventory from '../models/inventoryModel';
import { getProductsByBrand } from '../service/inventoryService';

export const getInventoryIdByBrandName = async (req: Request, res: Response) => {
  try {
    const { brandName } = req.params;

    const inventory = await Inventory.findOne({ brandName });

    if (!inventory) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(200).json({ inventoryId: inventory.inventoryId });
  } catch (error) {
    console.error('Error fetching inventory by brand name:', error);
    res.status(500).json({ message: 'Failed to fetch inventory' });
  }
};

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

// Controller method to get all inventory data by branchShortId
export const getInventoryByShortId = async (req: Request, res: Response) => {
  const { branchShortId } = req.params;  // Get branchShortId from URL parameter

  try {
    // Find all inventory items with the given branchShortId
    const inventories = await Inventory.find({ branchShortId});

    if (!inventories || inventories.length === 0) {
      return res.status(404).json({ message: 'No inventory found for the specified branchShortId' });
    }

    res.status(200).json(inventories);
  } catch (error) {
    console.error('Error fetching inventory by branchShortId:', error);
    res.status(500).json({ message: 'Server error while fetching inventory', error });
  }
};
