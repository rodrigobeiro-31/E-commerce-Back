const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/token", adminController.tokens); //busca tokens
router.get("/:params", adminController.index); //busca todos los elementos de user ,product,ordesr, y lo que quieras
router.post("/create/:model", adminController.create); //suma +1 a los productos con id
// router.get("/:id", userController.show);
router.get("/store/:model/:id", adminController.store); ///registra usuarios
// router.get("/editar/:id", userController.edit);
router.post("/:model/:id", adminController.update);
router.delete("/:model/:id/:image", adminController.destroy); //borra los stock de productos
router.get("/", adminController.indexAdmin);
module.exports = router;
