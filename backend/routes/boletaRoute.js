'use strict'

const express = require("express");
const boletaController = require("../controllers/boletaController");
const api = express.Router();

// Crear una nueva boleta
api.post("/boleta", boletaController.createBoleta);

// Obtener todas las boletas
api.get("/boleta", boletaController.getAllBoletas);

// Obtener una boleta por ID
api.get("/boleta/:id", boletaController.getBoletaById);

// Actualizar una boleta
api.put("/boleta/:id", boletaController.actualizarBoleta);


api.get('/boleta/numero/:numero', boletaController.obtenerBoletaPorNumero);

// Eliminar una boleta
api.delete("/boleta/:id", boletaController.deleteBoleta);

//verifica el numero de boleta
api.get('/boleta/exists/:numero', boletaController.verificarNumeroBoleta);

module.exports = api;