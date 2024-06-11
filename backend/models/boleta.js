"use strict";
const mongoose = require("mongoose");
const boleta = require("./boleta");
const schema = mongoose.Schema;

const boletaSchema = schema({
  numero: {
    type: Number,
    required: true,
  },
  producto: {
    type: String,
    require: true,
  },
  precio_unitario: {
    type: String,
    require: true,
  },
  fecha: {
    type: Date,
    require: true,
  },
  cantidad: {
    type: Number,
    require: true,
  },
  proveedor: [
    {
      type: schema.ObjectId,
      ref: "proveedor",
    },
  ],
});
module.exports = mongoose.model("boleta", boletaSchema);
