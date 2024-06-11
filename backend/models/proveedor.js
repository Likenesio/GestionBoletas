'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const proveedorSchema = schema( 
{
            rut : {
                type: String,
                required: true
            },
            nombre: {
                type: String,
                require: true
            },
            direccion:{
                type: String,
                require: true
            },
}
    );
module.exports = mongoose.model('proveedor', proveedorSchema);