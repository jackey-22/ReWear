const itemModel = require('../models/item.model');
const Item = require('../models/item.model');
const userModel = require('../models/user.model');
// const User = require('../models/user.model');

// Get all unverified & active items
const getUnverifiedItems = async (req, res, next) => {
	try {
		const items = await Item.find({ isVerified: false, isActive: true }).populate(
			'ownerId',
			'name email phone profileImage points'
		);
		return res.status(200).json(items);
	} catch (error) {
		console.error('Error in getUnverifiedItems:', error);
		return res.status(500).json({ message: 'Failed to fetch unverified items' });
	}
};

// Approve an item
const approveItem = async (req, res, next) => {
	try {
		const item = await Item.findByIdAndUpdate(
			req.params.id,
			{ isVerified: true },
			{ new: true }
		);

		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}

		return res.status(200).json({ message: 'Item approved', item });
	} catch (error) {
		console.error('Error in approveItem:', error);
		return res.status(500).json({ message: 'Failed to approve item' });
	}
};

// Reject an item
const rejectItem = async (req, res, next) => {
	try {
		const item = await Item.findByIdAndUpdate(
			req.params.id,
			{ isActive: false },
			{ new: true }
		);

		if (!item) {
			return res.status(404).json({ message: 'Item not found' });
		}

		return res.status(200).json({ message: 'Item rejected/removed', item });
	} catch (error) {
		console.error('Error in rejectItem:', error);
		return res.status(500).json({ message: 'Failed to reject item' });
	}
};

const getDashboardStats = async (req, res) => {
	try {
		const totalUsers = await userModel.countDocuments();
		const itemsListed = await itemModel.countDocuments();
		const totalAccepted = await itemModel.countDocuments({ isVerified: true });
		const totalRejected = await itemModel.countDocuments({
			isVerified: false,
			isActive: false,
		});

		return res.status(200).json({
			success: true,
			data: {
				totalUsers,
				itemsListed,
				totalAccepted,
				totalRejected,
			},
		});
	} catch (error) {
		console.error('Dashboard Stats Error:', error);
		return res.status(500).json({ success: false, message: 'Server Error' });
	}
};

const getAdminProfile = async (req, res) => {
	try {
		const userId = res.locals.userData.id;

		if (!userId) {
			return res
				.status(401)
				.json({ success: false, message: 'Unauthorized: No user in context' });
		}

		const admin = await userModel.findById(userId);

		if (!admin) {
			return res.status(404).json({ success: false, message: 'Admin not found' });
		}

		return res.status(200).json({ success: true, data: admin });
	} catch (error) {
		console.error('Error fetching admin profile:', error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
};

module.exports = {
	getUnverifiedItems,
	approveItem,
	rejectItem,
	getDashboardStats,
	getAdminProfile,
};
