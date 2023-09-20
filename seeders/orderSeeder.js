const { faker } = require("@faker-js/faker");
const Order = require("../models/Order");

faker.locale = "es";

module.exports = async () => {
  const orders = [
    {
      _id: "0001",
      userEmail: "juan@juan.com",
      userId: "23",
      cart: [{ price: 1, name: "espresso", quantity: 2 }],
      status: "pending",
      totalPrice: 2,
    },
    {
      _id: "0002",
      userEmail: "Maria@maria.com",
      userId: "22",
      cart: [{ price: 2, name: "danish", quantity: 4 }],
      status: "delivered",
      totalPrice: 10,
    },
  ];
  await Order.insertMany(orders);
  console.log("[Database] Se corrió el seeder de Orders.");
};
