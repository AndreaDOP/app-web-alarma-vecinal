// Mapa.jsx
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const center = {
  lat: -34.909674,  // Coordenadas del centro del mapa
  lng: -58.0290821
};

const barrioPerimeter = [
  { lat: -34.911014, lng: -58.030201 }, // ubicacion 507 y las vias
  { lat: -34.911788, lng: -58.026586 }, // ubicacion 509 y las vias
  { lat: -34.910935, lng: -58.024794 }, // ubicacion 137bis e/509 y 510
  { lat: -34.909685, lng: -58.025115 }, // ubicacion 137 y 509
  { lat: -34.908181, lng: -58.027830 }, // ubicacion 137 y 507
];

function Mapa() {
  console.log('Clave API de Google Maps:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
  return (
    <LoadScript 
    googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} // Usar la variable de entorno
      loadingElement={<div>Cargando Mapa...</div>} // Mostrar este mensaje mientras el mapa carga
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={16}
      >
        <Marker
          position={center} // Posiciona el marcador en el centro del mapa
          title="Centro del Mapa"
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default Mapa;
