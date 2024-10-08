// Registro
import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import "../App.css";

// Estilos del contenedor del mapa
const containerStyle = {
  width: '100%',
  height: '400px',
};

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codigoArea, setCodigoArea] = useState(''); 
  const [celular, setCelular] = useState('');
  const [direccion, setDireccion] = useState('');
  const [numeroAlarma, setNumeroAlarma] = useState('');
  const [fotoUsuario, setFotoUsuario] = useState('');
  const [fotoCasa, setFotoCasa] = useState('');
  const [latitud, setLatitud] = useState('');
  const [longitud, setLongitud] = useState('');
  const [loading, setLoading] = useState(false); 
  

  const mapRef = useRef(null);  // Referencia al mapa
  const navigate = useNavigate();

   // Cargar la API de Google Maps
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });
  
  // Función para capturar la ubicación cuando el usuario hace clic en el mapa
  const handleMapClick = useCallback((event) => {
    const nuevaLatitud = event.latLng.lat();
    const nuevaLongitud = event.latLng.lng();
    console.log("Latitud:", nuevaLatitud, "Longitud:", nuevaLongitud);
    setLatitud(event.latLng.lat());
    setLongitud(event.latLng.lng());
    
  }, []);

  <GoogleMap
  mapContainerStyle={containerStyle}
  center={{ lat: -34.911, lng: -58.030 }}
  zoom={15}
  onClick={handleMapClick}  // Manejador de clics para capturar la ubicación
  ref={mapRef}
>
  {latitud && longitud && (
    <Marker
      position={{ lat: parseFloat(latitud), lng: parseFloat(longitud) }}
      draggable={true}
      onDragEnd={(event) => {
        setLatitud(event.latLng.lat());
        setLongitud(event.latLng.lng());
      }}
    />
  )}
</GoogleMap>

   // Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('celular', celular);
    formData.append('direccion', direccion);
    formData.append('numeroAlarma', numeroAlarma);
    formData.append('fotoUsuario', fotoUsuario);
    formData.append('fotoCasa', fotoCasa);
    formData.append('latitud', latitud);
    formData.append('longitud', longitud);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]); // Para verificar qué se envía
    }
  

    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        alert(`Hola ${nombre}, Registro exitoso. Revisa tu correo para verificar tu cuenta.`);
        // Limpiar el formulario después del registro
        setNombre('');
        setEmail('');
        setPassword('');
        setCelular('');
        setDireccion('');
        setNumeroAlarma('');
        setFotoUsuario(null);
        setFotoCasa(null);
        setLatitud('');
        setLongitud('');

        // Redirigir a la página de "Conectados"
        navigate('/conectados');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (error) {
      setLoading(false);
      alert('Error al registrar usuario');
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Campos de entrada */}
        <div className="form-group">
          <label>Nombre y Apellidos:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Número Celular:</label>
          <div style={{ display: 'flex', gap: '10px' }}>
          <input
            type="text"
            placeholder="Código de área"
            value={codigoArea}
            onChange={(e) => setCodigoArea(e.target.value)}
            className="form-control"
            style={{ width: '100px' }}
            required
          />
          <input
              type="text"
              placeholder="Número"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              className="form-control"
              required
          />
          </div>
        </div>

        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Número de Alarma:</label>
          <input
            type="text"
            value={numeroAlarma}
            onChange={(e) => setNumeroAlarma(e.target.value)}
            className="form-control"
            required
          />
        </div>

        {/* Campos de coordenadas */}
        <div className="form-group">
          <label>Latitud:</label>
          <input
            type="text"
            value={latitud}
            onChange={(e) => setLatitud(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Longitud:</label>
          <input
            type="text"
            value={longitud}
            onChange={(e) => setLongitud(e.target.value)}
            className="form-control"
            required
          />
        </div>

        {/* Mapa de Google */}
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: -34.911, lng: -58.030 }}
            zoom={15}
            onClick={handleMapClick}
            ref={mapRef}
          >
            {latitud && longitud && (
              <Marker
                position={{ lat: parseFloat(latitud), lng: parseFloat(longitud) }}
                draggable={true}
                onDragEnd={(event) => {
                  setLatitud(event.latLng.lat());
                  setLongitud(event.latLng.lng());
                }}
              />
            )}
          </GoogleMap>
        )}

        <div className="form-group">
          <label>Foto de Usuario:</label>
          <input
            type="file"
            onChange={(e) => setFotoUsuario(e.target.files[0])}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label>Foto de la Casa:</label>
          <input
            type="file"
            onChange={(e) => setFotoCasa(e.target.files[0])}
            className="form-control"
            required
          />
        </div>

        <button
          type="submit"
          className={`btn btn-primary ${loading ? 'btn-loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Registrar'}
        </button>
      </form>
    </div>
  );
}

export default Registro;
