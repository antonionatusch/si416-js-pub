import mongoose from 'mongoose';

const OrderSchema = mongoose.Schema({
  order: {
    type: Array,
    required: true,
  },

  total: {
    type: Number,
    required: true,
  },

  client: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Client',
  },

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  state: {
    type: String,
    default: 'PENDING',
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = mongoose.model('Order', OrderSchema);
export default Order;
