const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['earned', 'spent'], required: true }, 
    method: { type: String, enum: ['listing', 'redemption'], required: true }, // gain via listing or cut through redeem
    points: { type: Number, required: true },
    relatedItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
    description: String,
    isActive: { type: Boolean, default: true } 
  },
  { timestamps: true }
);

const transactionModel = mongoose.model('Transaction', transactionSchema);
module.exports = transactionModel;