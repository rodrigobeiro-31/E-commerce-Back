const { mongoose, Schema } = require("../db");

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    admin: Boolean,
    orders: Array,
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
