import express from 'express';
const router = express.Router();
import auth_user from '../middleware/user-auth.js';

import {
	addProduct,
	deleteByID,
	getAllProduct,
	getProductByName,
	getProductsByCategory,
	updateProduct,
} from '../controllers/Product_controller.js';
import { upload } from '../middleware/image-handler.js';

router.post('/create', auth_user, upload.single('image'), addProduct);
router.get('/', auth_user, getAllProduct);
router.get('/:name', auth_user, getProductByName);
router.get('/category/:category', auth_user, getProductsByCategory);
router.delete('/:id', auth_user, deleteByID);
router.put('/:id', auth_user, updateProduct);

export default router;
