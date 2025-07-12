const itemModel = require('../models/item.model');

const getAllItems = async (req, res) => {
	try {
		const items = await itemModel.find({
			isActive: true,
			// isVerified: true,
			status: 'available',
		});
		return res.status(200).json({ success: true, data: items });
	} catch (error) {
		console.error('Error fetching items:', error);
		return res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

module.exports = {
	getAllItems,
};
