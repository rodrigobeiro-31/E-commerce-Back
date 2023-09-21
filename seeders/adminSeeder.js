const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const encryptedPassword = await bcrypt.hash("1234", 10);
  const encryptedPassword2 = await bcrypt.hash("1234", 10);
  const admins = [
    {
      firstname: "First",
      lastname: "Admin",
      email: "first@admin.com",
      password: encryptedPassword,
      admin: true,
    },
    {
      firstname: "Second",
      lastname: "Admin",
      email: "second@admin.com",
      password: encryptedPassword2,
      admin: true,
    },
    {
      firstname: "Admin",
      lastname: "Test",
      email: "admin@doppios.com",
      password: encryptedPassword2,
      admin: true,
    },
  ];
  await Admin.insertMany(admins);
  console.log("[Database] Se corrió el seeder de Admins.");
};
