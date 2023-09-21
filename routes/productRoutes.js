const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/filter/:category", productController.index);
router.get("/:id", productController.show);

module.exports = router;
