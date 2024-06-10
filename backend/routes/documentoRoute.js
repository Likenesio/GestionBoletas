'use strict';

var express = require('express');
var documentoController = ('../controllers/documentoController');
var api = express.Router();

api.post('/documento',usuarioController.insert);
api.get('/documento', usuarioController.listar);
api.put('/documento/:_id', usuarioController.actualizarDatos);
api.delete('/documento/:_id',usuarioController.eliminar);

module.exports = api;