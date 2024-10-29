import Inventory from '../models/inventoryModel';
import axios from 'axios';

export const getProductsByBrand = async (brandName: string) => {
  const inventoryRecords = await Inventory.find({ brandName });
  const inventoryData: any[] = [];

  for (const inventory of inventoryRecords) {
    const { branchShortId } = inventory;

    try {
      const response = await axios.get(`http://product-service-url/products`, {
        params: { inventoryShortId: branchShortId }
      });

      inventoryData.push({
        inventoryId: inventory.inventoryId,
        brandName: inventory.brandName,
        branchShortId: inventory.branchShortId,
        lastUpdated: inventory.lastUpdated,
        products: response.data
      });
    } catch (error) {
      console.error(`Failed to fetch products for branchShortId ${branchShortId}:`, error);
    }
  }

  return { inventoryDetails: inventoryData };
};
