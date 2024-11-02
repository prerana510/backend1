// src/controllers/productController.ts
import { Request, Response } from 'express';
import Product from '../models/productModel';
import axios from 'axios';

// Function to fetch all unique brand names based on branchShortId
export const getBrandsByBranch = async (req: Request, res: Response) => {
  const { branchShortId } = req.params;

  try {
    const brands = await Product.distinct('brandName', { branchShortId: branchShortId });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching brand names', error });
  }
};

// Fetch distinct categories for a given branchShortId and brandName
export const getCategoriesByBranchAndBrand = async (req: Request, res: Response) => {
  const { branchShortId, brandName } = req.params;

  try {
    const categories = await Product.distinct('category', {
      branchShortId,
      brandName,
    });

    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Get all products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a single product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Get a single product by productShortId
export const getProductByShortId = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({ productShortId: req.params.productShortId });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Get products by brand name
export const getProductsByBrand = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ brandName: req.params.brandName });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this brand' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by brand', error });
  }
};

// Get products by category
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const products = await Product.find({ category: req.params.category });
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found in this category' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products by category', error });
  }
};

/*
// Replace with the base URL of the Inventory microservice
const INVENTORY_SERVICE_URL = 'http://localhost:5002/api/inventory';

export const getCategoriesByBrand = async (req: Request, res: Response) => {
  try {
    const { brandName } = req.params;

    // Step 2: Call Inventory Service to get inventoryShortId by brandName
    const inventoryResponse = await axios.get(`${INVENTORY_SERVICE_URL}/brand/${brandName}`);
    const inventory = inventoryResponse.data;

    if (!inventory || !inventory.inventoryId) {
      return res.status(404).json({ error: 'Brand not found in Inventory Service' });
    }

    // Step 3: Find products by inventoryShortId and get unique categories
    const products = await Product.find({ inventoryShortId: inventory.inventoryShortId });

    const categories = Array.from(
      new Set(products.map(product => product.category))
    ).map(category => ({ name: category }));

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const addProductByBrand = async (req: Request, res: Response) => {
  const { brandName } = req.params;
  const productData = req.body; // assuming product data is passed in the request body

  try {
    // Step 2: Call Inventory Service to get inventoryShortId by brandName
    const inventoryResponse = await axios.get(`${INVENTORY_SERVICE_URL}/brand/${brandName}`);
    const inventory = inventoryResponse.data;

    if (!inventory || !inventory.inventoryId) {
      return res.status(404).json({ error: 'Brand not found in Inventory Service' });
    }

    // Step 3: Create new product using product data and inventoryShortId
    const newProduct = new Product({
      ...productData,
      inventoryShortId: inventory.inventoryId, // Assign the inventoryShortId from the Inventory Service
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error:any) {
    console.log(error.message)
    res.status(500).json({ error: 'Failed to add product' });
  }
};

export const getCategoriesByBrandName = async (req: Request, res: Response) => {
  try {
    const { brandName } = req.params;

    // Step 1: Fetch inventory details from the Inventory service
    const inventoryResponse = await axios.get(`${INVENTORY_SERVICE_URL}/brand/${brandName}`);
    
    if (inventoryResponse.status !== 200 || !inventoryResponse.data) {
      return res.status(404).json({ message: 'Brand not found in Inventory service' });
    }

    const { inventoryId } = inventoryResponse.data;

    // Step 2: Find products by the inventory ID in the Product service
    const products = await Product.find({ inventoryShortId: inventoryId });

    // Step 3: Extract unique categories from the products
    const categories = Array.from(new Set(products.map(product => product.category)));

    res.status(200).json({ brandName, categories });
  } catch (error) {
    console.error('Error fetching categories by brand name:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

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
*/