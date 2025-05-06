const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clienteRoutes = require('./routes/cliente.routes');
const pedidoRoutes = require('./routes/pedido.routes');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas principales
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Rutas API
app.use('/api', clienteRoutes);
app.use('/api', pedidoRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente! 🚀");
});

// Configurar puerto
const PORT = process.env.PORT || 4000;

// Mensaje de depuración después de definir el puerto
console.log(`Intentando iniciar servidor en http://localhost:${PORT}`);


app.on("listening", () => {
    console.log("🔍 Express está LISTENING en el puerto 4000.");
});


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
}).on("error", (err) => {
    console.error("❌ Error al iniciar el servidor:", err);
});

module.exports = app;