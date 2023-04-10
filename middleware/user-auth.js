import jwt from 'jsonwebtoken';

const auth_user = (req, res, next) => {
	try {
		const token = req.body['auth_token'].split(' ')[1];
		// console.log(token);
		var decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (decoded) {
			console.log(decoded);
			next();
		} else {
			console.log(decoded);
			res.json({ message: 'not authenticated' });
		}
	} catch (err) {
		if (err.message == 'invalid token') {
			res.json({ message: 'not authenticated, Invalid Token' });
		}
	}
};

export default auth_user;
