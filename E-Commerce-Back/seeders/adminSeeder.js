const { faker } = require("@faker-js/faker");
const Admin = require("../models/Admin");

faker.locale = "es";

module.exports = async () => {
  /**
   * Escribir código del seeder aquí...
   */
  console.log("[Database] Se corrió el seeder de Admins.");
};
