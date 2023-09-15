const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/token", adminController.tokens);
router.get("/:params", adminController.index);
router.get("/:params/info", adminController.create);
// router.get("/:id", userController.show);
// router.post("/", userController.store);
// router.get("/editar/:id", userController.edit);
// router.patch("/:id", userController.update);
// router.delete("/:id", userController.destroy);

module.exports = router;
