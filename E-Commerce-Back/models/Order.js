const { mongoose, Schema } = require("../db");

const orderSchema = new Schema({
    
}, {
    timestamps: true
});

const Order = mongoose.Model("Order", orderSchema);

module.exports = Order;
