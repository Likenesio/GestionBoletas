"use strict";

const mongoose = require("mongoose");
const schema = mongoose.Schema;

const productoSchema = new schema({
  nombre: {
    type: String,
    required: true,
  },
  precio_unitario: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
});

const boletaSchema = new schema({
  numero:{
    type: Number,
    required: true,
  },
  productos: [productoSchema],
  fecha: {
    type: Date,
    required: true,
  },
  proveedor: [
    {
      type: schema.ObjectId,
      ref: "proveedor",
    },
  ],
});

module.exports = mongoose.model("boleta", boletaSchema);
