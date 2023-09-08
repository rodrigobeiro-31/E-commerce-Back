const { mongoose, Schema } = require("../db");

const userSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    admin: false,
    orders: Array,
    cart: Array,
}, {
    timestamps: true
});

const User = mongoose.Model("User", userSchema);

module.exports = User;
