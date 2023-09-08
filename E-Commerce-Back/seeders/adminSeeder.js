const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const admins = [];
  const encryptedPassword = await bcrypt.hash("1234", 10);
  const admin = {
    firstname: "Admin",
    lastname: "Istrador",
    email: "admin@admin.com",
    password: encryptedPassword,
    admin: true,
  };
  admins.push(admin);
  await Admin.insertMany(admins);
  console.log("[Database] Se corrió el seeder de Admins.");
};


