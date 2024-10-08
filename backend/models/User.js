const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  celular: { type: String, required: true },
  direccion: { type: String, required: true },
  numeroAlarma: { type: String, required: true },
  fotoUsuario: { type: String },
  fotoCasa: { type: String },
  ubicacionGoogleMaps: {
    lat: { type: Number, required: true },  // Latitud
    lng: { type: Number, required: true },  // Longitud
  },
  verificado: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);


