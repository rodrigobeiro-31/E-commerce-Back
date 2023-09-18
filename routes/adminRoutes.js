const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.post("/token", adminController.tokens); //busca tokens
router.get("/:params", adminController.index); //busca todos los elementos de user ,product,ordesr, y lo que quieras
router.post("/users", adminController.create); //suma +1 a los productos con id
// router.get("/:id", userController.show);
router.get("/store/:model/:id", adminController.store); ///registra usuarios
// router.get("/editar/:id", userController.edit);
router.post("/:model/:id", adminController.update);
router.delete("/:model/:id", adminController.destroy); //borra los stock de productos
module.exports = router;
