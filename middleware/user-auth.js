import jwt from 'jsonwebtoken';

const auth_user = async (req, res, next) => {
	try {
		const token = req.body['auth_token'].split(' ')[1];

		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		if (!token) {
			return res.status(401).send('Access Denied');
		} else {
			req.admin = decoded;
			next();
		}
	} catch (err) {
		if (err.message == 'invalid token') {
			return res.json({ message: 'not authenticated, Invalid Token' });
		}
	}
};

export default auth_user;
