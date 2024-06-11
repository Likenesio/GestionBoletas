const proveedor = require("../models/proveedor");
var Proveedor = require("../models/proveedor");

const insert = (req, res) => {
  let proveedor = new Proveedor();
  proveedor.rut = req.body.rut;
  proveedor.nombre = req.body.nombre;
  proveedor.direccion = req.body.direccion;
  proveedor
    .save()
    .then((newProveedor) => {
      res.status(200).send({ newProveedor });
    })
    .catch((err) => {
      res.status(500).send({ mensaje: "Error al ingresar un proveedor: " + err });
    });
};

const eliminar = (req, res) => {
  let id = req.params._id;
  Proveedor.findByIdAndDelete(id)
    .then((proveedor) => {
      if (!proveedor) {
        return res.status(404).send({ mensaje: "Proveedor no encontrado para eliminar" });
      }
      res.status(200).send({ mensaje: "Proveedor eliminado exitosamente" }); 
    })
    .catch((err) => {
      return res.status(500).send({ mensaje: "Error al eliminar proveedor: " + err });
    });
};

const actualizar = (req, res) => {
  let id = req.params._id;
  let rut = req.body.rut;
  let nombre = req.body.nombre;
  let direccion = req.body.direccion;

  Proveedor.findByIdAndUpdate(
    id,
    { rut: rut, nombre: nombre, direccion: direccion },
    { new: true }
  )
    .then((proveedor) => {
      if (!proveedor) {
        return res.status(404).send({ mensaje: "Proveedor no encontrado para actualizar" });
      }
      res.status(200).send({
        mensaje: "Proveedor actualizado exitosamente",
        proveedor: proveedor,
      });
    })
    .catch((err) => {
      return res.status(500).send({ mensaje: "Error al querer actualizar al Proveedor: " + err });
    });
};

const buscarPorID = (req, res) => {
  let id = req.params._id;
  Proveedor.findById(id)
    .then((proveedor) => {
      if (!proveedor) {
        return res.status(404).send({ mensaje: "No hay proveedores con esta identificación" });
      }
      res.status(200).send({ proveedor });
    })
    .catch((err) => {
      return res.status(500).send({ mensaje: "Error al buscar proveedor por ID: " + err });
    });
};

const listar = (req, res) => {
  Proveedor.find({})
    .exec()
    .then((proveedor) => {
      res.status(200).send({ proveedor });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ mensaje: "No se han encontrado proveedores" });
    });
};
module.exports = {
  insert,
  eliminar,
  actualizar,
  listar,
  buscarPorID,
};
