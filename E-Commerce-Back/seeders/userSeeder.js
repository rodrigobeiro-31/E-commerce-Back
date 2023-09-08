const { faker } = require("@faker-js/faker");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

faker.locale = "es";

module.exports = async () => {
  const users = [];
  const encryptedPassword = await bcrypt.hash("1234", 10);

  for (let i = 0; i < 10; i++) {
    const user = new User({
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      email: faker.internet.email(),
      password: encryptedPassword,
      admin: false,
      orders: [],
      cart: [],
    })
    users.push(user);
  };
  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
