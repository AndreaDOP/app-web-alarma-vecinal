const nodemailer = require('nodemailer');
require('dotenv').config();  // Asegúrate de que las variables de entorno se carguen

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: 'destino@gmail.com',  // Reemplaza con tu dirección de correo de prueba
  subject: 'Prueba de envío de correo',
  text: 'Este es un correo de prueba enviado desde Nodemailer',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.log('Error enviando correo:', error);
  }
  console.log('Correo enviado:', info.response);
});
