'use strict'
const mongoose = require('mongoose');
const schema = mongoose.Schema;
const userSchema = schema( 
{
            rut_usuario : {
                type: String,
                required: true
            },
            nombre_usuario: {
                type: String,
                required: true
            },
            apellido: {
             type: String,
             required: true
            },
            contrasenia: {
                type: String,
                required: true
            },
            fono: {
                type: String,
                required:true
            },
            correo:{
                type: String,
                required:true
            },
            rol:{
                type: String,
                required: true
            }
 
}
    );
module.exports = mongoose.model('usuario', userSchema);