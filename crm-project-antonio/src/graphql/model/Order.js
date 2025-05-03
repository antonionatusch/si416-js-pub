import mongoose from 'mongoose';

const OrderItemSchema = mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  },
);

const OrderSchema = mongoose.Schema({
  order: {
    type: [OrderItemSchema],
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
