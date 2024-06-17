// controllers/boletaController.js
const Boleta = require("../models/boleta");
const Proveedor = require("../models/proveedor");

const createBoleta = async (req, res) => {
  try {
    const { numero, productos, fecha, proveedor, total, estado } = req.body;
    const newBoleta = new Boleta({ numero, productos, fecha, proveedor, total, estado });
    await newBoleta.save();
    res.status(201).json(newBoleta);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllBoletas = async (req, res) => {
  try {
    const boletas = await Boleta.find().populate("proveedor");
    res.status(200).json(boletas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBoletaById = async (req, res) => {
  try {
    const boleta = await Boleta.findById(req.params.id).populate("proveedor");
    if (!boleta) return res.status(404).json({ message: "Boleta no encontrada" });
    res.status(200).json(boleta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const actualizarBoleta = async (req, res) => {
  const boletaId = req.params.id;

  try {
    const {
      numero,
      productos,
      fecha,
      estado,
      total,
      proveedor // Si se necesita actualizar el proveedor también
    } = req.body;

    // Validar que productos sea un array válido (en caso de ser necesario)

    const updatedBoleta = await Boleta.findByIdAndUpdate(
      boletaId,
      {
        numero,
        productos,
        fecha,
        estado,
        total,
        proveedor // Asegúrate de que el nombre del campo en req.body coincida con el nombre en el esquema
      },
      { new: true }
    ).populate('proveedor'); // Asegúrate de que 'proveedor' sea un campo de referencia correctamente definido en el esquema

    if (!updatedBoleta) {
      return res.status(404).json({ message: 'Boleta no encontrada' });
    }

    res.status(200).json({
      mensaje: 'Boleta actualizada exitosamente',
      boleta: updatedBoleta
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la boleta', error: error.message });
  }
};


const deleteBoleta = async (req, res) => {
  try {
    const deletedBoleta = await Boleta.findByIdAndDelete(req.params.id);
    if (!deletedBoleta) return res.status(404).json({ message: "Boleta no encontrada" });
    res.status(200).json({ message: "Boleta eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const verificarNumeroBoleta = async (req, res) => {
  try {
    const { numero } = req.params;
    const boleta = await Boleta.findOne({ numero });
    if (boleta) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const obtenerBoletaPorNumero = async (req, res) => {
  const { numero } = req.params;

  try {
    const boleta = await Boleta.findOne({ numero }).populate('proveedor');
    if (!boleta) {
      return res.status(404).json({ message: 'Boleta no encontrada' });
    }
    res.status(200).json({ boleta });
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar la boleta', error: error.message });
  }
};

module.exports = { createBoleta, getAllBoletas, getBoletaById, actualizarBoleta, deleteBoleta, verificarNumeroBoleta, obtenerBoletaPorNumero };