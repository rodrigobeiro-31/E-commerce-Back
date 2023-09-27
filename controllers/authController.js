const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Mail = require("../accessories/mailsender");
const mongoose = require("mongoose");
const orderSeeder = require("../seeders/orderSeeder");
const productSeeder = require("../seeders/productSeeder");
const userSeeder = require("../seeders/userSeeder");
const adminSeeder = require("../seeders/adminSeeder");

const authController = {
  tokens: async (req, res) => {
    //Verificar usuario en DB
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.json({ error: "Wrong credentials..." });

    //Verificar contraseña (la contraseña en db hace match con la recibida)
    const verifyPass = await bcrypt.compare(req.body.password, user.password);

    if (!verifyPass) return res.json({ error: "Wrong credentials..." });

    //Genero token
    const token = jwt.sign({ sub: user.id, email: user.email }, process.env.JWT_SECRET);
    res.json({ token: token, id: user._id });
  },

  admin: async (req, res) => {
    //Verificar usuario en DB
    const admin = await Admin.findOne({ email: req.body.email });

    if (!admin) return res.json({ error: "Wrong credentials..." });

    // Verificar si es admin
    if (!admin.admin) return res.json({ error: "You're not an admin!" });

    //Verificar contraseña (la contraseña en db hace match con la recibida)
    const verifyPass = await bcrypt.compare(req.body.password, admin.password);

    if (!verifyPass) return res.json({ error: "Wrong credentials..." });

    //Genero token
    const token = jwt.sign({ sub: admin.id, email: admin.email }, process.env.JWT_SECRET);
    res.json({ token: token, firstname: admin.firstname, lastname: admin.lastname });
  },

  mail: async (req, res) => {
    const email = req.body.email;
    const subject = "Reset email from Doppio´s";
    const clave = `Doppio_${Date.now()}`;
    const encryptedPassword = await bcrypt.hash(clave, 10);
    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
          crossorigin="anonymous"
        />
         <title>Doppio's</title>
      </head> <html>
    <body>
      <h2>Dear,</h2>
      <h3>We wanted to inform you that your password for your account has been successfully changed.</h3>
      <h3>Your new password is :<span style="color:blue"> ${clave} </span>, please make sure to securely store it.</h3> 
      <h3>Thank you for choosing Doppio's! We look forward to welcoming you soon.</h3>
      </body>
  </html>`;

    const findUser = await User.find({ email });
    if (findUser) {
      const updatePass = await User.findOneAndUpdate(
        { email },
        {
          password: encryptedPassword,
        },
        { returnOriginal: false },
      );
      Mail(email, clave, subject, html);
      return res.json("clave cambiada y mensaje enviado");
    } else {
      console.log("no es cliente");
      return res.json("no es cliente");
      // }
    }
  },
  database: async (req, res) => {
    try {
      const db = mongoose.createConnection(`${process.env.DB_CONNECTION_STRING}`);
      await db.dropCollection("orders");
      await db.dropCollection("products");
      await db.dropCollection("admins");
      await db.dropCollection("users");
      await userSeeder();
      await adminSeeder();
      await productSeeder();
      await orderSeeder();

      return res.json("Base de datosa actualizada!");
    } catch (err) {
      console.log(err);
    }
  },
};
module.exports = authController;
