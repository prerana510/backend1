// src/controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/productModel';

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productName, description, category, price, inventoryShortId } = req.body;

    const product = new Product({
      productName,
      description,
      category,
      price,
      inventoryShortId,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productName, description, category, price, inventoryShortId } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { productName, description, category, price, inventoryShortId, updatedAt: new Date() },
      { new: true }
    );

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Get a single branch by shortId
export const getProductByShortId = async (req: Request, res: Response): Promise<void> => {
  try {
      const branch = await Product.findOne({ productShortId: req.params.shortId });
      if (!branch) {
          res.status(404).json({ message: 'Branch not found' });
      } else {
          res.json(branch);
      }
  } catch (error) {
      res.status(500).json({ message: 'Error fetching branch by shortId', error });
  }
};