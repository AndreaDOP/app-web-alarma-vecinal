// conectados
import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, Polygon, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom'; 

const containerStyle = {
  width: '100%',
  height: '600px',
};

const barrioPerimeter = [
  { lat: -34.911014, lng: -58.030201 },
  { lat: -34.911788, lng: -58.026586 },
  { lat: -34.910935, lng: -58.024794 },
  { lat: -34.909685, lng: -58.025115 },
  { lat: -34.908181, lng: -58.027830 },
];

function Conectados({ currentUser }) {
  console.log("currentUser:", currentUser);  // Asegúrate de que contiene la latitud y longitud
  
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,  // Usa tu clave desde el archivo .env
  });

  const [usuarios, setUsuarios] = useState([]);
  const [selectedUsuario, setSelectedUsuario] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/inicio-sesion');  // Redirigir si no hay token
      return;  // Detener la ejecución si no hay token
    }

    // Obtener los usuarios conectados
    fetch('http://localhost:5000/auth/usuarios')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la petición: ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Usuarios recibidos:', data);  // Verificar los datos que llegan del servidor
        setUsuarios(data);
      })
      .catch((error) => console.error('Error al obtener usuarios:', error));
  }, [navigate]);

  if (!isLoaded) {
    return <div>Cargando mapa...</div>;
  }

  return (
    <div>
      {/* Mostrar los detalles del usuario actual (conectado) */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {currentUser?.fotoUsuario && (
          <img
            src={`http://localhost:5000${currentUser?.fotoUsuario}`}
            alt="Foto de usuario"
            style={{ width: '100px', borderRadius: '100%' }}
          />
        )}
        <h2>{currentUser?.nombre ? currentUser.nombre : 'Nombre no disponible'}</h2>
        <p style={{ color: 'red', fontWeight: 'bold', fontSize: '18px' }}>Conectado a la red</p>
        <p><strong>Alarma N°:</strong> {currentUser?.numeroAlarma || 'No especificado'}</p>
        <p>Ubicación: <a href={`https://www.google.com/maps?q=${currentUser?.ubicacionGoogleMaps.lat},${currentUser?.ubicacionGoogleMaps.lng}`} target="_blank" rel="noopener noreferrer">Ver en Google Maps</a></p>
      </div>

      {/* Mostrar los usuarios en el mapa */}
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: -34.911014, lng: -58.030201 }}
        zoom={16}
      >
        <Polygon
          paths={barrioPerimeter}
          options={{
            fillColor: "#FF0000",
            fillOpacity: 0.2,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />

        {/* Mostrar la ubicación del usuario logueado */}
        {currentUser?.ubicacionGoogleMaps?.lat && currentUser?.ubicacionGoogleMaps?.lng && (
          <Marker
            position={{
              lat: currentUser.ubicacionGoogleMaps.lat,
              lng: currentUser.ubicacionGoogleMaps.lng,
            }}
            icon={{
              url: `http://localhost:5000${currentUser.fotoUsuario}`,
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20),
            }}
          />
        )}

        {/* Mostrar los demás usuarios */}
        {usuarios.map((usuario) => (
          <Marker
            key={usuario._id}
            position={{ lat: usuario.ubicacionGoogleMaps.lat, lng: usuario.ubicacionGoogleMaps.lng }}  // Usar las coordenadas
            onClick={() => setSelectedUsuario(usuario)}
            icon={{
              url: `http://localhost:5000${usuario.fotoUsuario}`,
              scaledSize: new window.google.maps.Size(40, 40),
              anchor: new window.google.maps.Point(20, 20),
            }}
          />
        ))}

        {selectedUsuario && (
          <InfoWindow
            position={{ lat: selectedUsuario.ubicacionGoogleMaps.lat, lng: selectedUsuario.ubicacionGoogleMaps.lng }}
            onCloseClick={() => setSelectedUsuario(null)}
          >
            <div style={{ textAlign: 'center' }}>
    {/* Mostrar el nombre del usuario */}
    <h3>{selectedUsuario.nombre}</h3>

    {/* Mostrar la foto de la casa */}
    {selectedUsuario.fotoCasa ? (
      <img
        src={`http://localhost:5000${selectedUsuario.fotoCasa}`}  // Asegúrate de que la URL sea correcta
        alt="Foto de la casa"
        style={{ width: '200px', height: 'auto', borderRadius: '10px' }}  // Ajustar tamaño y estilo
      />
    ) : (
      <p>Foto de la casa no disponible</p>
    )}

    {/* Mostrar el número de alarma */}
    <p><strong>Número de Alarma:</strong> {selectedUsuario.numeroAlarma || 'No especificado'}</p>

    {/* Enlace a Google Maps con la ubicación */}
    <p>
      <a
        href={`https://www.google.com/maps?q=${selectedUsuario.ubicacionGoogleMaps.lat},${selectedUsuario.ubicacionGoogleMaps.lng}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver ubicación en Google Maps
        </a>
     </p>
    </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default Conectados;


