const express = require('express');
const router = express.Router();
const parqueaderoController = require('../controllers/parqueaderoController');

router.post('/ingreso', parqueaderoController.ingreso);
router.post('/salida', parqueaderoController.salida);
router.get('/recibo/:placa', parqueaderoController.recibo);

module.exports = router;
