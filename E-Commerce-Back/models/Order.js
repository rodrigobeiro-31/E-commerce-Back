const { mongoose, Schema } = require("../db");

const orderSchema = new Schema({
    
}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
