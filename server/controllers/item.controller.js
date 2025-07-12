const itemModel = require('../models/item.model');

const getAllItems = async (req, res, next) => {
	const items = await itemModel.find({
		isActive: true,
		isVerified: true,
		status: 'available',
	});
	return res.status(200).json({ success: true, data: items });
};

const getItemById = async (req, res, next) => {
	const item = await itemModel.findById(req.params.id).populate('ownerId'); // owner refers to user _id
	if (!item) {
		return res.status(404).json({ success: false, message: 'Item not found' });
	}

	return res.status(200).json({ success: true, data: item });
};

module.exports = {
	getAllItems,
	getItemById,
};
