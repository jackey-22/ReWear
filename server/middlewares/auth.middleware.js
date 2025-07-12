const jwt = require('jsonwebtoken');

function authMiddleware(role) {
	return (req, res, next) => {
		// authorization : Bearer <token>
		if (!req.headers.authorization) {
			return res.status(401).json({ error: 'Authorization token missing' });
		}

		const token = req.headers.authorization.split(' ')[1];
		let userData = null;

		try {
			userData = jwt.verify(token, process.env.JWT_SECRET);
			// console.log('\x1b[32m%s\x1b[0m', '{');
			// console.log('\x1b[34m%s\x1b[0m', '  username : ' + userData.username);
			// console.log('Decoded token role:', userData.role);
			// console.log('\x1b[32m%s\x1b[0m', '}');
		} catch (error) {
			return res.status(401).json({ error: 'Invalid or expired token' });
		}

		if (role && userData.role !== role) {
			return res.status(403).json({ error: 'Forbidden: insufficient privileges' });
		}

		res.locals.userData = userData;
		next();
	};
}

module.exports = { authMiddleware };
