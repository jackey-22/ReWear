const Item = require('../models/item.model');
const User = require('../models/user.model');

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

module.exports = {
	getUnverifiedItems,
	approveItem,
	rejectItem,
};
