const orderController = require("../controllers/orderController");
const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");

router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

module.exports = router;
