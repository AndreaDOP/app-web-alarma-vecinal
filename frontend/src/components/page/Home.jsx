// Home
import React from 'react';
import Mapa from '../Mapa';  // Asegúrate de que la ruta a Mapa.jsx sea correcta
import { Link } from 'react-router-dom';  // Para agregar enlaces a Inicio de Sesión y Registro
import '../Home.css';  // Crea un archivo CSS para dar estilo al layout si aún no lo tienes

const Home = () => {
  return (
    <div className="home-container">
      <header>
        <div className="navigation-links">
        <Link to="/inicio-sesion" className="btn btn-primary">Inicio de Sesión</Link>  {/* Enlace a Inicio de Sesión */}
        <Link to="/registro" className="btn btn-secondary">Registro</Link>  {/* Enlace a Registro */}
      </div>
        <h1>¡Bienvenido a Alarma Vecinal!</h1>
        <h3>Barrio Altos de Don Carlos I</h3>
      </header>
      
      <div className="map-container">
        <Mapa />  {/* El mapa se centra dentro de este contenedor */}
      </div>

      
    </div>
  );
};

export default Home;

