'use strict';
require ('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');
app.use(cors());
app.options('*', cors());

var usuario_route = require('./routes/usuarioRoute');
var documento_route = require('./routes/documentoRoute');

const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('api', usuario_route);
app.use('api', documento_route);
