import User_model from '../models/User_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (req, res) => {
	try {
		const { username, password } = req.body;
		const user = await User_model.findOne({ username });
		if (user) {
			const isMatch = await bcrypt.compare(password, user.password);
			if (isMatch) {
				const token = jwt.sign(
					{
						id: user._id,
						username: user.username,
					},
					process.env.SECRET_KEY,
					{
						expiresIn: '1h',
					},
				);
				res.set('auth-token', 'Bearer ' + token).json({
					message: 'login successful',
				});
			} else {
				res.status(401).json({ message: 'invalid credentials' });
			}
		}
	} catch (error) {
		console.log(error);
	}
};

const addUser = async (req, res) => {
	try {
		const checkUser = await User_model.find({ email: req.body.email });

		if (checkUser.length > 0) {
			console.log(checkUser);
			res.status(409).json({ message: 'user already exists' });
		} else {
			const password = req.body.password;

			bcrypt.hash(password, 10, (err, hash) => {
				if (!err) {
					req.body.password = hash;
					User_model.create(req.body).then((user) => {
						if (user) {
							console.log(user);
							res.status(200).json(user);
						} else
							res.status(404).json({
								message: 'cannot create user',
							});
					});
				}
			});
		}
	} catch (error) {
		console.log(error.message);
	}
};

const getAllUsers = async (req, res) => {
	try {
		const users = await User_model.find({});
		if (!users) {
			res.status(404).json({ message: 'no users found' });
		} else {
			res.status(200).json(users);
		}
	} catch (error) {
		console.log(error.message);
	}
};

const getUserByUsername = async (req, res) => {
	try {
		const user = await User_model.findOne({
			username: req.params.username,
		});
		if (!user) {
			res.status(404).json({ message: 'user not found' });
		} else {
			res.status(200).json(user);
		}
	} catch (error) {
		console.log(error.message);
	}
};

const updateUser = async (req, res) => {
	try {
		const { username } = req.params;
		await User_model.findOneAndUpdate(
			{ username },
			{ $set: req.body },
			{ new: true },
		).then((user) => {
			if (user) {
				res.json({ user });
			} else {
				res.status(404).json({ message: 'user not found' });
			}
		});
	} catch (error) {
		console.log(error);
	}
};

const deleteUser = async (req, res) => {
	try {
		const { username } = req.params;

		const deleteUser = await User_model.findOneAndDelete({ username });
		if (deleteUser) {
			res.json({ message: 'user deleted' });
		} else {
			res.json({ message: 'user not found' });
		}
	} catch (error) {
		console.log(error);
	}
};

export {
	addUser,
	getAllUsers,
	getUserByUsername,
	updateUser,
	deleteUser,
	loginUser,
};
