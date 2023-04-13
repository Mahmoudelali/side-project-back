import {
	addUser,
	getAllUsers,
	getUserByUsername,
	updateUser,
	deleteUser,
	loginUser,
} from '../controllers/User_controller.js';

import auth_user from '../middleware/user-auth.js';

import express from 'express';

const router = express.Router();

//login user
router.post('/login', loginUser);
// add user
router.post('/create', addUser);
// get usersx
router.get('/', getAllUsers);
// get by username
router.get('/:username', auth_user, getUserByUsername);
// update user by username
router.put('/update/:username', auth_user, updateUser);
// delete user by username
router.delete('/delete/:username', auth_user, deleteUser);

export default router;
