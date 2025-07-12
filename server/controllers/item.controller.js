const itemModel = require('../models/item.model');

const getAllItems = async (req, res) => {
	try {
		const items = await itemModel.find({
			isActive: true,
			isVerified: true,
			status: 'available',
		});
		return res.status(200).json({ success: true, data: items });
	} catch (error) {
		console.error('Error fetching items:', error);
		return res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};
// GET /browse-items/:id
const getItemById = async (req, res) => {
	try {
		const item = await itemModel.findById(req.params.id);

		if (!item) {
			return res.status(404).json({ success: false, message: 'Item not found' });
		}

		return res.status(200).json({ success: true, data: item });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ success: false, message: 'Server Error' });
	}
};

module.exports = {
	getAllItems,
    getItemById
};
