const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/filter/:category", productController.index);
router.get("/:id", productController.show);
router.post("/", productController.store);
router.delete("/:id", productController.destroy);
router.patch("/:id", productController.update);

module.exports = router;
