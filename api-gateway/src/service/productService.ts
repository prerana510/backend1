// src/services/productService.ts
import axios from 'axios';

const PRODUCT_SERVICE_URL = 'http://localhost:3003/api/products';

export const getProductsByBranchShortId = async (branchShortId: string) => {
  const response = await axios.get(`${PRODUCT_SERVICE_URL}`, {
    params: { branchShortId },
  });
  return response.data;
};
