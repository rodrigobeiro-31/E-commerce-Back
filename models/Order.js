const { mongoose, Schema } = require("../db");

const orderSchema = new Schema(
  {
    _id: String,
    userEmail: String,
    userId: String,
    cart: Array,
    status: String,
    totalPrice: Number,
  },
  {
    timestamps: true,
  },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
