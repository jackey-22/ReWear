const jwt = require('jsonwebtoken');
const md5 = require('md5');
const userModel = require('../models/user.model'); // or serviceProviders model

async function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password)
		return res.status(400).json({ success: false, message: 'Email and password are required' });

	try {
		const hashedPassword = md5(password); // hash the entered password
		const user = await userModel.findOne({ email, passwordHash: hashedPassword });

		if (!user || !user.isActive)
			return res
				.status(401)
				.json({ success: false, message: 'Invalid credentials or inactive user.' });

		const token = jwt.sign(
			{
				id: user._id,
				role: user.role,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '1d' }
		);

		return res.json({
			success: true,
			data: {
				token,
				role: user.role,
				id: user._id,
				email: user.email,
				// name: user.name
			},
		});
	} catch (error) {
		console.error('Login error:', error);
		return res.status(500).json({ success: false, message: 'Server error' });
	}
}

async function register(req, res) {
	const { name, email, password, phone, address } = req.body;

	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ success: false, message: 'Name, email, and password are required' });
	}

	try {
		// Check if user already exists
		const existingUser = await userModel.findOne({ email });
		if (existingUser) {
			return res.status(409).json({ success: false, message: 'Email already registered' });
		}

		const newUser = new userModel({
			name,
			email,
			passwordHash: md5(password),
			phone,
			address,
			// other optional fields (gender, etc.) can be set later
		});

		await newUser.save();

		return res.status(201).json({
			success: true,
			message: 'User registered successfully',
			data: {
				id: newUser._id,
				email: newUser.email,
				// name: newUser.name,
				role: newUser.role,
			},
		});
	} catch (error) {
		console.error('Registration Error:', error);
		return res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
}
async function logout(req, res) {
	res.clearCookie('auth');
	return res.json({ success: true });
}

module.exports = { login, logout, register };
