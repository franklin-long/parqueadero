const Vehiculo = require('../models/vehiculoModel');

exports.ingreso = async (req, res) => {
  const { placa, tipo } = req.body;

  try {
    const horaIngreso = new Date();

    const vehiculo = new Vehiculo({
      placa: placa.toUpperCase(),
      tipo,
      horaIngreso,
    });

    await vehiculo.save();

    const message = `Vehículo ingresado - Tipo: ${tipo}, Placa: ${placa}, Hora: ${horaIngreso}`;
    res.status(200).json({ message });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
};

exports.salida = async (req, res) => {
  const { placa } = req.body;

  try {
    const vehiculo = await Vehiculo.findOne({ placa: placa.toUpperCase() });

    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }

    const horaSalida = new Date();
    vehiculo.horaSalida = horaSalida;
    await vehiculo.save();

    const tiempoTranscurrido = Math.ceil((horaSalida - vehiculo.horaIngreso) / (1000 * 60)); // en minutos

    let costo;
    if (tiempoTranscurrido <= 480) { // Menos de 8 horas (480 minutos)
      costo = vehiculo.tipo === 'carro' ? 3000 : 1500;
    } else {
      costo = vehiculo.tipo === 'carro' ? 4000 : 2000;
    }

    const message = `Vehículo salió - Tipo: ${vehiculo.tipo}, Placa: ${placa}, Tiempo: ${tiempoTranscurrido} minutos, Costo: ${costo} pesos`;
    res.status(200).json({ message });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
};

exports.recibo = async (req, res) => {
  const { placa } = req.params;

  try {
    const vehiculo = await Vehiculo.findOne({ placa: placa.toUpperCase() });

    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado.' });
    }

    const horaSalida = vehiculo.horaSalida || new Date(); // Si no hay hora de salida, usa la actual
    const tiempoTranscurrido = Math.ceil((horaSalida - vehiculo.horaIngreso) / (1000 * 60)); // en minutos

    let costo;
    if (tiempoTranscurrido <= 480) { // Menos de 8 horas (480 minutos)
      costo = vehiculo.tipo === 'carro' ? 3000 : 1500;
    } else {
      costo = vehiculo.tipo === 'carro' ? 4000 : 2000;
    }

    const recibo = {
      tipo: vehiculo.tipo,
      placa: vehiculo.placa,
      horaIngreso: vehiculo.horaIngreso,
      horaSalida,
      tiempoTranscurrido,
      costo,
    };

    res.status(200).json({ recibo });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  }
};
