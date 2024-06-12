const express = require("express");
const router = express.Router();
const boletaController = require("../controllers/boletaController");

// Crear una nueva boleta
router.post("/", boletaController.createBoleta);

// Obtener todas las boletas
router.get("/", boletaController.getAllBoletas);

// Obtener una boleta por ID
router.get("/:id", boletaController.getBoletaById);

// Actualizar una boleta
router.put("/:id", boletaController.updateBoleta);

// Eliminar una boleta
router.delete("/:id", boletaController.deleteBoleta);

module.exports = router;