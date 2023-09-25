const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.post("/tokens", authController.tokens);
router.post("/tokens/admin", authController.admin);
router.post("/mail", authController.mail);

module.exports = router;
