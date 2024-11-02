import express from 'express';
import { createInventory, getInventoryByShortId, fetchProductsByBrand,
    getInventoryIdByBrandName
} from '../controllers/inventoryController';

const router = express.Router();

router.post('/', createInventory);
router.get('/branch/:branchShortId', getInventoryByShortId as any);
router.get('/products', fetchProductsByBrand as any);
router.get('/brand/:brandName', getInventoryIdByBrandName as any );

export default router;
