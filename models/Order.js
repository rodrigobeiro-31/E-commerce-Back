const { mongoose, Schema } = require("../db");

const orderSchema = new Schema({
    _id: String,
    user: Object,
    cart: Array,
    status: String,
    totalPrice: Number,
},
    {
        timestamps: true
    });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
