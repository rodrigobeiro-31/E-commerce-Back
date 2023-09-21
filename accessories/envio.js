const Mail = require("./mailsender.js");
require("dotenv").config();

const a = "jsiutto@gmail.com"; //destino ponele node envio.js desde accessories
const b = "prueba 4"; //titulo

Mail(a, b);
