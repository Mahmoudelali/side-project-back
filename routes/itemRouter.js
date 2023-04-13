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

// create a new product
router.post('/create', auth_user, upload.single('image'), addProduct);
// view all products
router.get('/', getAllProduct);
// get a single product
router.get('/:name', getProductByName);
// get a single product by category name
router.get('/category/:category', getProductsByCategory);
// delete a product by ID
router.delete('/:id', deleteByID);
// update a product by id
router.put('/:id', auth_user, updateProduct);

export default router;
