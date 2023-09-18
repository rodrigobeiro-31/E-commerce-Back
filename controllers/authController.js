const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
    res.json({ token: token});
  },
};

module.exports = authController;
