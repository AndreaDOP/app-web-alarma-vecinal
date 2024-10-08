// auth.js
const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Crear el router
const router = express.Router();

// Configurar Nodemailer para el envío de correos
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Configurar Multer para guardar imágenes en una carpeta llamada "uploads"
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Ruta de registro de usuarios
router.post('/register', upload.fields([{ name: 'fotoUsuario' }, { name: 'fotoCasa' }]), async (req, res) => {
  const { nombre, email, password, celular, direccion, numeroAlarma, latitud, longitud } = req.body;

  // Verificar qué datos llegan al servidor
  console.log('Datos recibidos:', req.body);  // Asegúrate de que las coordenadas estén en la salida

  try {
    if (!nombre || !email || !password || !celular || !direccion || !numeroAlarma || !latitud || !longitud) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios, incluidas las coordenadas' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const fotoUsuario = req.files['fotoUsuario'] ? `/uploads/${req.files['fotoUsuario'][0].filename}` : null;
    const fotoCasa = req.files['fotoCasa'] ? `/uploads/${req.files['fotoCasa'][0].filename}` : null;

    // Crear un nuevo usuario con las coordenadas de ubicación
    const newUser = new User({
      nombre,
      email,
      password: hashedPassword,
      celular,
      direccion,
      numeroAlarma,
      fotoUsuario,
      fotoCasa,
      ubicacionGoogleMaps: {
        lat: parseFloat(latitud), //  un número
        lng: parseFloat(longitud)  // un número
      },
      verificado: false,
    });

    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const urlVerificacion = `http://localhost:5173/verificar/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verificación de Registro',
      html: `<h1>Bienvenido</h1><p>Haz clic en el siguiente enlace para verificar tu cuenta:</p><a href="${urlVerificacion}">Verificar cuenta</a>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: 'Error al enviar el correo de verificación.' });
      }
      res.status(201).json({ message: 'Usuario registrado correctamente. Revisa tu correo.' });
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }
    res.status(500).json({ error: 'Error en el servidor.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.find({}, 'nombre numeroAlarma ubicacionGoogleMaps fotoUsuario');  // Devuelve los campos necesarios
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});


// Ruta de verificación de la cuenta
router.get('/verificar/:token', async (req, res) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    const user = await User.findByIdAndUpdate(decoded.userId, { verificado: true });

    if (!user) {
      return res.status(400).json({ message: 'Token inválido o usuario no encontrado' });
    }

    res.json({ message: 'Cuenta verificada exitosamente' });
  } catch (error) {
    res.status(400).json({ message: 'Token inválido o expirado' });
  }
});

module.exports = router;
