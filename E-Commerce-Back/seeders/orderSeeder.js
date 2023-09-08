const { faker } = require("@faker-js/faker");
const Order = require("../models/Order");

faker.locale = "es";

module.exports = async () => {
  /**
   * Escribir código del seeder aquí...
   */
  console.log("[Database] Se corrió el seeder de Orders.");
};
