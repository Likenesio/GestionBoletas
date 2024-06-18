'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express(); 

app.use(cors());
app.options('*', cors());

var usuario_route = require('./routes/usuarioRoute');
var proveedor_route = require('./routes/proveedorRoute');
var boleta_route = require('./routes/boletaRoute');

const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/api', usuario_route);
app.use('/api', proveedor_route);
app.use('/api', boleta_route);

const options = {
    autoIndex: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4
};
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;
const db_name = process.env.DB_NAME;
const port = process.env.PORT || 3000;

mongoose.connect(`mongodb+srv://${db_host}:${db_port}@prueba.ycow5hn.mongodb.net/${db_name}`, options)
.then(() => console.log('> Successfully connected to DB')).catch(err => console.log(err))

app.listen(port, () => {
    console.log('> Servicio corriendo en puerto ' + port);
})



module.exports = app;