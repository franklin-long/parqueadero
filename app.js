const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb+srv://melo1:Cardinal123456@cluster0.43xaeuc.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Configuración de middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Configuración de rutas
const parqueaderoRoutes = require('./src/routes/parqueaderoRoutes');
app.use('/parqueadero', parqueaderoRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
