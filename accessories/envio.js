const Mail = require("./mailsender.js");
require("dotenv").config();

const a = "jsiutto@gmail.com"; //destino
const b = "prueba 4"; //titulo
const c = "va texto de prueba desde el mail 4"; // texto

Mail(a, b, c);
