'use strict'

var express = require('express');
var proveedorController = require('../controllers/proveedorController');
var api = express.Router();

api.post('/proveedor', proveedorController.insert);
api.get('/proveedor', proveedorController.listar);
api.get('/proveedor/:_id', proveedorController.buscarPorID);
api.put('/proveedor/:_id', proveedorController.actualizar);
api.delete('/proveedor/:_id', proveedorController.eliminar);

module.exports = api;