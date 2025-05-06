const { Pedido } = require('../models');
const moment = require('moment'); // Para formatear la fecha

exports.obtenerPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll();
        const pedidosFormateados = pedidos.map(pedido => ({
            ...pedido.dataValues,
            fecha: moment(pedido.fecha).format('DD/MM/YYYY') // Formato dd/mm/aaaa
        }));
        res.json(pedidosFormateados);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los pedidos", error });
    }
};

exports.obtenerPedidoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }
        res.json({
            ...pedido.dataValues,
            fecha: moment(pedido.fecha).format('DD/MM/YYYY'),
            producto: pedido.producto // Asegurar que producto se incluya
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el pedido", error });
    }
};

exports.crearPedido = async (req, res) => {
    try {
        const pedido = await Pedido.create(req.body);
        pedido.fecha = moment(pedido.fecha).format('DD/MM/YYYY'); // Formato dd/mm/aaaa
        res.status(201).json(pedido);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el pedido", error });
    }
};

exports.actualizarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }
        await pedido.update(req.body);
        res.json({
            mensaje: "Pedido actualizado correctamente",
            pedido: {
                ...pedido.dataValues,
                fecha: moment(pedido.fecha).format('DD/MM/YYYY') // Formato dd/mm/aaaa
            }
        });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el pedido", error });
    }
};

exports.eliminarPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const pedido = await Pedido.findByPk(id);
        if (!pedido) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }
        await pedido.destroy();
        res.json({ mensaje: "Pedido eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el pedido", error });
    }
};