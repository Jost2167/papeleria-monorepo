import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  products: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      totalPrice: Number,
      image: String,
    }
  ],
  totalQuantity: Number,
  totalPrice: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
