const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema(
  {
    itemRequestedId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    requestedById: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    offeredItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', default: null },
    method: {
      type: String,
      enum: ['swap', 'points'],
      required: true
    },
    usedPoints: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected', 'cancelled', 'completed'],
      default: 'pending'
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const swapModel = mongoose.model('SwapRequest', swapRequestSchema);
module.exports = swapModel;