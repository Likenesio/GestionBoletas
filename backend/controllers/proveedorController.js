const proveedor = require("../models/proveedor");
var Proveedor = require("../models/proveedor");

const insert = (req, res) => {
  let proveedor = new Proveedor();
  proveedor.rut = req.body.rut;
  proveedor.nombre = req.body.nombre;
  proveedor.direccion = req.body.direccion;
  proveedor
    .save()
    .then(( newProveedor) => {
      res.status(200).send({ newProveedor });
    })
    .catch((err) => {
      res.status(500).send({ mensaje: "error al ingresar un proveedor:" + err });
    });
};

const eliminar = (req, res) => {
  let id = req.params._id;
  Proveedor.findByIdAndDelete(id)
    .then((proveedor) => {
      res.status(200).send({ mensaje: "Proveedor eliminado exitosamente"}); 
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ mensaje: "Error al eliminar proveedor" });
    });
};

const actualizar = (req, res) => {
  let id = req.params._id;
  rut = req.body.rut;
  nombre = req.body.nombre;
  direccion = req.body.direccion;

  Proveedor.findByIdAndUpdate(
    id,
    {
      rut: rut,
      nombre: nombre,
      direccion: direccion
    },
    { new: true }
  )
    .then((proveedor) => {
      res.status(200).send({
        mensaje: "Proveedor actualizado exitosamente",
        proveedor: proveedor,
      });
    })
    .catch((err) => {
      return res.status(500).send({
        mensaje: "Ha ocurrido un error al querer actualizar al Proveedor ",
      });
    });
};

const listar = (req, res) => {
  Proveedor.find({})
    .exec()
    .then((proveedor) => {
      res.status(200).send({proveedor});
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ mensaje: "No se han encontrado proveedores" });
    });
};
const buscarPorID = (req, res) => {
  let id = req.params._id;
  Proveedor.findById(id)
    .then((client) => {
      res.status(200).send({ proveedor });
    })
    .catch((err) => {
      return res
        .status(500)
        .send({ mensaje: "No hay proveedores con esta identificación" });
    });
};
module.exports = {
  insert,
  eliminar,
  actualizar,
  listar,
  buscarPorID,
};