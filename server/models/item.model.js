const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    title: { type: String, required: true },
    description: String,
    category: String, // e.g., Men, Women, Kids
    type: String,     // e.g., Shirt, Pants
    size: String,
    condition: String, // e.g., New, Like New, Used
    tags: [String], // e.g., hashtags like denim, trendy, classy
    images: [String], // can have multiple images
    status: {
      type: String,
      enum: ['available', 'pending_swap', 'swapped'],
      default: 'available'
    },
    redeemableWith: {
      type: String,
      enum: ['points', 'swap', 'points_or_swap'], // owner have privilege to select where to show
      default: 'points_or_swap'
    },
    points: {
			type: Number,
			default: 0,
		},
		isVerified: { type: Boolean, default: false },
		isActive: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const itemModel = mongoose.model('Item', itemSchema);
module.exports = itemModel;
