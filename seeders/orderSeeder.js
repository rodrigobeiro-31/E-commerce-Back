const { faker } = require("@faker-js/faker");
const Order = require("../models/Order");

faker.locale = "es";

module.exports = async () => {
  const orders = [];
  await Order.insertMany(orders);
  console.log("[Database] Se corrió el seeder de Orders.");
};
