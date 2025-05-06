const express = require('express');
const router = express.Router();
const { obtenerPedidos, obtenerPedidoPorId, crearPedido, actualizarPedido, eliminarPedido } = require('../controllers/pedido.controller');

router.get('/pedidos', obtenerPedidos);           // Obtener todos los pedidos
router.get('/pedidos/:id', obtenerPedidoPorId);  // Obtener un pedido por ID
router.post('/pedidos', crearPedido);            // Crear un nuevo pedido
router.put('/pedidos/:id', actualizarPedido);    // Actualizar un pedido
router.delete('/pedidos/:id', eliminarPedido);   // Eliminar un pedido

module.exports = router;