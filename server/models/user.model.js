const mongoose = require('mongoose');

const userschema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		passwordHash: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: false,
		},
		profileImage: {
			type: String,
		},
		address: {
			type: String,
		},
		points: {
			type: Number,
			default: 0,
		},
		gender: {
			type: String,
			enum: ['male', 'female', 'other'],
			required: false,
		},
		listings: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Item',
			},
		],
		swaps: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'SwapRequest',
			},
		],
		role: {
			type: String,
			enum: ['user', 'admin'],
			default: 'user',
		},
		isActive: { type: Boolean, default: true },
	},
	{
		timestamps: true, // automatically creates createdAt and updatedAt
	}
);

const userModel = mongoose.model('users', userschema);
module.exports = userModel;
