const Item = require('../models/item.model');
const Swap = require('../models/swap-request.model');
const User = require('../models/user.model');

// 📄 GET /profile
exports.getUserProfile = async (req, res) => {
	try {
		const user = await User.findById(req.user._id).select('-passwordHash');
		if (!user) return res.status(404).json({ message: 'User not found' });
		res.status(200).json(user);
	} catch (error) {
		console.error('Get profile error:', error);
		res.status(500).json({ message: 'Failed to fetch user profile' });
	}
};

// ✏️ POST /profile
exports.updateUserProfile = async (req, res) => {
	try {
		const updates = req.body;
		const user = await User.findByIdAndUpdate(req.user._id, updates, {
			new: true,
		}).select('-passwordHash');

		if (!user) return res.status(404).json({ message: 'User not found' });
		res.status(200).json({ message: 'Profile updated', user });
	} catch (error) {
		console.error('Update profile error:', error);
		res.status(500).json({ message: 'Failed to update user profile' });
	}
};

exports.requestSwap = async (req, res, next) => {
	try {
		const itemRequestedId = req.params.id; // 🔄 Use from URL param
		const { offeredItemId } = req.body;
		const requestedById = req.user._id;

		// Validate input
		if (!offeredItemId) {
			throw new ErrorResponse('Offered item is required', 400);
		}

		// Fetch items
		const [requestedItem, offeredItem] = await Promise.all([
			Item.findById(itemRequestedId),
			Item.findById(offeredItemId),
		]);

		if (!requestedItem) {
			throw new ErrorResponse('Requested item not found', 404);
		}
		if (!offeredItem) {
			throw new ErrorResponse('Offered item not found', 404);
		}
		if (requestedItem.status !== 'available') {
			throw new ErrorResponse('Requested item is not available for swap', 400);
		}
		if (offeredItem.ownerId.toString() !== requestedById.toString()) {
			throw new ErrorResponse('You can only offer your own item', 403);
		}
		if (requestedItem.ownerId.toString() === requestedById.toString()) {
			throw new ErrorResponse('You cannot swap with your own item', 400);
		}

		// Create Swap
		const swap = await Swap.create({
			itemRequestedId,
			offeredItemId,
			requestedById,
			method: 'swap',
		});

		// Update requested item status
		await Item.findByIdAndUpdate(itemRequestedId, { status: 'pending_swap' });

		res.status(201).json({
			success: true,
			data: swap,
			message: 'Swap request created successfully',
		});
	} catch (error) {
		next(error);
	}
};


exports.redeemWithPoints = async (req, res, next) => {
	try {
		const itemRequestedId = req.params.id;
		const requestedById = req.user._id;

		// ✅ Step 1: Find the item and its owner
		const item = await Item.findById(itemRequestedId).populate('ownerId');
		if (!item || item.status !== 'available') {
			return res.status(404).json({ success: false, message: 'Item not available' });
		}

		// ✅ Step 2: Ensure the item can be redeemed with points
		if (!['points', 'points_or_swap'].includes(item.redeemableWith)) {
			return res
				.status(400)
				.json({ success: false, message: 'Item not eligible for point redemption' });
		}

		const requiredPoints = item.points || 20;

		// ✅ Step 3: Fetch user and item owner
		const [user, owner] = await Promise.all([
			User.findById(requestedById),
			User.findById(item.ownerId._id),
		]);

		if (!user || !owner) {
			return res.status(404).json({ success: false, message: 'User or owner not found' });
		}

		// ✅ Step 4: Check user balance
		if (user.points < requiredPoints) {
			return res.status(400).json({ success: false, message: 'Insufficient points' });
		}

		// ✅ Step 5: Perform swap + update points + mark item swapped
		const redeem = await Swap.create({
			itemRequestedId,
			requestedById,
			method: 'points',
			usedPoints: requiredPoints,
			status: 'completed',
		});

		user.points -= requiredPoints;
		owner.points += requiredPoints;
		item.status = 'swapped';

		await Promise.all([user.save(), owner.save(), item.save()]);

		// ✅ Step 6: Send success response
		return res.status(200).json({
			success: true,
			message: 'Redeemed via points ✅',
			redeem,
		});
	} catch (error) {
		console.error('Redeem error:', error);
		return res.status(500).json({ success: false, message: 'Redemption failed ❌' });
	}
};

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

		const item = new Item({
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
		const products = await Item.find().sort({ createdAt: -1 });
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
