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
    console.log(req.body);
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
    const subject = "cambio de contraseña de Doppios";
    subjet = "reset email from Doppio´s";
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
      <h3>HELLO, you are receiving this email, to obtain a new password.. your new password is...</h3>
      <h1> Your new key is : ${clave} </h1> 
      <h3>Thank you, we are waiting for you at Doppio's!!!</h3>
      </body>
  </html>`;

    const findUser = await User.find({ email });
    const _id = findUser[0]._id;

    if (findUser[0].email === email) {
      const clave = `Doppio_${Date.now()}`;
      const encryptedPassword = await bcrypt.hash(clave, 10);
      const saveNwe = await User.updateMany({ _id }, { $set: { password: encryptedPassword } });
      const findUser = await User.find({ email });
      console.log("nuevo ", findUser);
      Mail(email, clave, html);
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
