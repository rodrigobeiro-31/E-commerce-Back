const orderController = require("../controllers/orderController");
const express = require("express");
const router = express.Router();
const { expressjwt: checkJwt } = require("express-jwt");

router.get("/", orderController.index);
router.get("/:id", orderController.show);
router.post(
  "/",
  checkJwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),
  orderController.store,
);
router.patch("/:id", orderController.update);

module.exports = router;
