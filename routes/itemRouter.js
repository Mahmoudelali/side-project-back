import express from 'express';
const router = express.Router();

import {
	addProduct,
	deleteByID,
	getAllProduct,
	getProductByName,
	getProductsByCategory,
	updateProduct,
} from '../controllers/Product_controller.js';
import { upload } from '../middleware/image-handler.js';

router.post('/create', upload.single('image'), addProduct);
router.get('/', getAllProduct);
router.get('/:name', getProductByName);
router.get('/category/:category', getProductsByCategory);
router.delete('/:id', deleteByID);
router.put('/:id', updateProduct);

export default router;
