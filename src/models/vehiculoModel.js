const mongoose = require('mongoose');

// Esquema de vehículo
const vehiculoSchema = new mongoose.Schema({
  placa: { type: String, required: true },
  tipo: { type: String, required: true },
  horaIngreso: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
