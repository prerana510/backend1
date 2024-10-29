import express from 'express';
import { createInventory, getInventoryByShortId, fetchProductsByBrand} from '../controllers/inventoryController';

const router = express.Router();

router.post('/', createInventory);
router.get('/branch/:shortId', getInventoryByShortId);
router.get('/products', fetchProductsByBrand as any);

export default router;
