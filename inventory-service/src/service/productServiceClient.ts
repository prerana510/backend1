// services/interServiceCommunication.ts

import axios from 'axios';
import { IProduct } from '../models/Product';
import { IInventory } from '../models/Inventory';

// Set the base URLs for the services (these should be configured in your environment variables for production)
const PRODUCT_SERVICE_URL = 'http://<product-service-url>'; // Replace with actual URL

// Function to fetch products by inventory short ID
export const fetchProductsByInventoryShortId = async (inventoryShortId: string): Promise<IProduct[]> => {
  try {
    const response = await axios.get(`${PRODUCT_SERVICE_URL}/products/inventory/${inventoryShortId}`);
    return response.data; // Assuming the response contains an array of products
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

// Function to create a product in the Product Service
export const createProductInService = async (productData: IProduct): Promise<IProduct> => {
  try {
    const response = await axios.post(`${PRODUCT_SERVICE_URL}/products`, productData);
    return response.data; // Assuming the response returns the created product
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Failed to create product');
  }
};
