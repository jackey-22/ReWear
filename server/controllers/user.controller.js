const productModel = require('../models/item.model'); // Ensure this is the correct model

// Create Product
async function createProduct(req, res, next) {
	try {
		const {
			title,
			description,
			category,
			type,
			size,
			condition,
			tags,
			status,
			redeemableWith,
			points,
		} = req.body;

		const rawTags = req.body.tags || [];
		const tagList = Array.isArray(rawTags)
			? rawTags.map((t) => t.trim())
			: typeof rawTags === 'string'
			? rawTags.split(',').map((t) => t.trim())
			: [];

		const imagePaths = (req.files || []).map((file) => `/uploads/${file.filename}`);

		const ownerId = res.locals.userData?.id;

		if (!ownerId) {
			return res.status(401).json({ error: 'Unauthorized. Missing user ID.' });
		}

		const item = new productModel({
			title,
			description,
			category,
			type,
			size,
			condition,
			tags: tagList,
			status: status || 'available',
			redeemableWith: redeemableWith || 'points_or_swap',
			points: redeemableWith === 'swap' ? 0 : Number(points) || 0,
			images: imagePaths,
			ownerId,
			isVerified: false,
			isActive: true,
		});

		const saved = await item.save();
		res.status(201).json(saved);
	} catch (err) {
		console.error('Error saving item:', err);
		res.status(500).json({ error: 'Failed to save item' });
	}
}

// Get all products
async function getAllProducts(req, res) {
	try {
		const products = await productModel.find().sort({ createdAt: -1 });
		res.status(200).json(products);
	} catch (err) {
		console.error('Error fetching products:', err);
		res.status(500).json({ error: 'Failed to fetch products' });
	}
}

module.exports = {
	createProduct,
	getAllProducts,
};
