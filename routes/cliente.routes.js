const express = require('express');
const router = express.Router();
const { obtenerClientes, crearCliente, obtenerClientePorId, actualizarCliente, eliminarCliente } = require('../controllers/cliente.controller');

router.get('/clientes', obtenerClientes);
router.post('/clientes', crearCliente);
router.get('/clientes/:id', obtenerClientePorId); // Aquí se usa la función
router.put('/clientes/:id', actualizarCliente);

router.delete('/clientes/:id', eliminarCliente);

module.exports = router;