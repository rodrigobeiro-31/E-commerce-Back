const { faker } = require("@faker-js/faker");
const Product = require("../models/Product");

faker.locale = "es";

module.exports = async () => {
  /**
   * Escribir código del seeder aquí...
   */
  console.log("[Database] Se corrió el seeder de Products.");
};
