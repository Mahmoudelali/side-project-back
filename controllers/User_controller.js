import User_model from '../models/User_model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Cookies from 'cookies';

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
						expiresIn: '24h',
					},
				);

				return res
					.setHeader('auth-token', 'Bearer ' + token)
					.status(200)
					.json({
						token,
						username: user.username,
						role: user.isAdmin,
						// reqData: req,
					});
				// res.header('Authorization', 'Bearer ' + token);
			} else {
				return res.status(401).json({
					message: 'invalid credentials',
				});
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
			return res.status(404).json({ message: 'no users found' });
		} else {
			return res.status(200).json(users);
		}
	} catch (error) {
		return console.log(error.message);
	}
};

const getUserByUsername = async (req, res) => {
	try {
		const user = await User_model.findOne({
			username: req.params.username,
		});
		if (!user) {
			return res.status(404).json({ message: 'user not found' });
		} else {
			return res.status(200).json(user);
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
		)
			.then((user) => {
				if (user) {
					console.log(user);
					return res.json({ user });
				} else {
					console.log(user);
					res.status(404).json({ message: 'user not found' });
				}
			})
			.catch((err) => {
				console.log(err.message);
			});
	} catch (error) {
		res.status(404).json({ message: error.message });
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
		console.log(error.messsage);
		return res.json({ message: error.message });
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
