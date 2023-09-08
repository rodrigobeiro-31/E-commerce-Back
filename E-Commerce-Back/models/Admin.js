const { mongoose, Schema } = require("../db");

const adminSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    admin: true,
}, {
    timestamps: true
});

const Admin = mongoose.Model("Admin", adminSchema);

module.exports = Admin;