const jwt = require('jsonwebtoken');
const md5 = require('md5');
// const studentModel = require('../models/student.model');
// const facultyModel = require('../models/faculty.model');

async function login(req, res) {
	const { username, password, role } = req.body;

	if (!username || !password)
		return res.status(400).json({ success: false, message: 'username and password required' });

	let profile = null;

	if (role === 'STUDENT') {
		profile = await studentModel.findOne({ enrollment: username, enrollment: password });
		if (!profile) return res.status(404).json({ message: 'Student profile not found' });
	} else if (role === 'FACULTY') {
		profile = await facultyModel.findOne({ email: username, email: password });
		if (!profile) return res.status(404).json({ message: 'faculty profile not found' });
	}

	const token = jwt.sign(
		{
			id: profile._id,
			// username: user.username,
			role: role,
		},
		process.env.JWT_SECRET,
		{ expiresIn: '1d' }
	);

	res.json({
		success: true,
		data: {
			token,
			username: role === 'STUDENT' ? profile.enrollment : profile.email,
			role: role,
			id: profile._id,
		},
	});
}

async function logout(req, res) {
	res.clearCookie('auth');
	return res.json({ success: true });
}

module.exports = {
	login,
	logout,
};
