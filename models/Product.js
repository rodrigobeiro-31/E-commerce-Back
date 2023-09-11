const { mongoose, Schema } = require("../db");

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    category: String,
    stock: Number,
    slug: String,
    image: String,
    top: Boolean
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
