const { faker } = require("@faker-js/faker");
const Order = require("../models/Order");

faker.locale = "es";

module.exports = async () => {
  const orders = [
    {
      _id: "0001",
      user: { userId: "22", email: "juan@juan.com" },
      cart: [{ price: 1, name: "esprsso", quantity: 2 }],
      status: "pending",
      totalPrice: 2,
    },
    {
      _id: "0002",
      user: { userId: "22", email: "Maria@maria.com" },
      cart: [{ price: 2, name: "danish", quantity: 4 }],
      status: "delivered",
      totalPrice: 10,
    },
  ];
  await Order.insertMany(orders);
  console.log("[Database] Se corrió el seeder de Orders.");
};
