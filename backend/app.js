// app.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Asegúrate de importar path
const connectDB = require('./db');  // Importar la conexión a la base de datos
const authRoutes = require('./routes/auth'); // Importar las rutas de autenticación


// Crear la aplicación de Express
const app = express();

// Habilitar CORS
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

// Middlewares
app.use(bodyParser.json());

// Conectar a MongoDB
connectDB();

// Servir archivos estáticos de la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Usar rutas de autenticación
app.use('/auth', authRoutes);

// Ruta genérica para verificar el servidor
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Escuchar en el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
