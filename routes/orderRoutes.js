const orderController = require("../controllers/orderController");
const express = require("express");
const router = express.Router();
// const { expressjwt: checkJwt } = require("express-jwt");

// router.use(checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }));

router.get("/", orderController.index);
router.post("/", orderController.store);
router.patch("/:id", orderController.update);


module.exports = router;
