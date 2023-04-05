import {
	addUser,
	getAllUsers,
	getUserByUsername,
	updateUser,
	deleteUser,
} from '../controllers/User_controller.js';

import express from 'express';

const router = express.Router();

// add user
router.post('/create', addUser);
// get users
router.get('/', getAllUsers);
// get by username
router.get('/:username', getUserByUsername);
// update user by username
router.put('/update/:username', updateUser);
// delete user by username
router.delete('/delete/:username', deleteUser);

export default router;