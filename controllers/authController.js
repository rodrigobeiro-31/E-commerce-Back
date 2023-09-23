const User = require("../models/User");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Mail = require("../accessories/mailsender");

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
    const text = " zapallo , para cambiar la clave toca aca ";
    const findUser = await User.find({ email });

    if (findUser[0].email === email) {
      const id = findUser.id;
      console.log("es usuario =>", findUser);
      const clave = `Doppio_${Date.now()}`;
      console.log("nueva clave=>", clave);
      const saveNwe = await User.updateOne({ id }, { $set: { password: clave } });
      console.log("? DESPUES DEL UPDATE=>", saveNwe.modifiedCount);

      // Mail(email, clave);
      // console.log("se mando email a ", email);
      //   console.log("con clave ", saveNwe);
      // } else {
      //   return console.log("no es cliente");
      // }
    }
  },
};
module.exports = authController;
