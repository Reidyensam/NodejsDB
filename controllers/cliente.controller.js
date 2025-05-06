const { Cliente } = require('../models'); 
exports.obtenerClientes = async (req, res) => { 
const clientes = await Cliente.findAll(); 
res.json(clientes); 
}; 
exports.crearCliente = async (req, res) => { 
const cliente = await Cliente.create(req.body); 
res.status(201).json(cliente); 
}; 

exports.obtenerClientePorId = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id); // Busca el cliente en la base de datos

        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }

        res.json(cliente);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el cliente", error });
    }
};

exports.actualizarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo } = req.body;

        // Buscar el cliente en la base de datos
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }

        // Actualizar los datos del cliente
        await cliente.update({ nombre, correo });

        res.json({ mensaje: "Cliente actualizado correctamente", cliente });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el cliente", error });
    }
};

exports.eliminarCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ mensaje: "Cliente no encontrado" });
        }
        await cliente.destroy();
        res.json({ mensaje: "Cliente eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el cliente", error });
    }
};