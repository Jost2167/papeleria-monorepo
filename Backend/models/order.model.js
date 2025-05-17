import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  zip: String
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  id: String,
  name: String,
  image: String,
  price: Number,
  quantity: Number
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  products: [ProductSchema],
  shippingInformation: ShippingSchema,
  totalPrice: Number,
  paymentMethod: {
    type: String,
    enum: ["cod", "dc", "bank"],
    required: true
  },
  bankProof: {
    type: String,
    required: function () {
      return this.paymentMethod === "bank";
    }
  },
  status: {
    type: String,
    enum: ["pendiente", "enviado", "entregado"],
    default: "pendiente"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Order", OrderSchema);
