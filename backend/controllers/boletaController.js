// controllers/boletaController.js
const Boleta = require("../models/boleta");
const Proveedor = require("../models/proveedor");

exports.createBoleta = async (req, res) => {
  try {
    const { numero, producto, precio_unitario, fecha, cantidad, proveedor } = req.body;
    const newBoleta = new Boleta({ numero, producto, precio_unitario, fecha, cantidad, proveedor });
    await newBoleta.save();
    res.status(201).json(newBoleta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllBoletas = async (req, res) => {
  try {
    const boletas = await Boleta.find().populate("proveedor");
    res.status(200).json(boletas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBoletaById = async (req, res) => {
  try {
    const boleta = await Boleta.findById(req.params.id).populate("proveedor");
    if (!boleta) return res.status(404).json({ message: "Boleta no encontrada" });
    res.status(200).json(boleta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBoleta = async (req, res) => {
  try {
    const updatedBoleta = await Boleta.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("proveedor");
    if (!updatedBoleta) return res.status(404).json({ message: "Boleta no encontrada" });
    res.status(200).json(updatedBoleta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBoleta = async (req, res) => {
  try {
    const deletedBoleta = await Boleta.findByIdAndDelete(req.params.id);
    if (!deletedBoleta) return res.status(404).json({ message: "Boleta no encontrada" });
    res.status(200).json({ message: "Boleta eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
