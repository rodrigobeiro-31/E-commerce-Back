const authController = require("../controllers/authController")
const express = require("express");
const router = express.Router();

/**
 * Se sugiere usar este archivo para crear rutas relativas al proceso de
 * autenticación. Ejemplos: "/login" y "/logout".
 */
router.post("/tokens", authController.tokens)

module.exports = router;
