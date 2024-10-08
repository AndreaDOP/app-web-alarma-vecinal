// routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InicioSesion from './components/InicioSesion/InicioSesion';
import Registro from './components/Registro/Registro';
import Mapa from './components/Mapa';
import Home from './components/page/Home';
import Conectados from './components/page/Conectados';
import VerificacionExitosa from './components/page/VerificacionExitosa';
import ForgotPassword from './components/page/ForgotPassword';  // ¡No olvides importar ForgotPassword!
import ResetPassword from './components/page/ResetPassword';  // También asegurarte de importar ResetPassword
import Verificar from './components/page/Verificar';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* Página principal con el mapa y los enlaces */}
      <Route path="/conectados" element={<Conectados />} />  {/* Ruta para la página de Conectados */}
      <Route path="/inicio-sesion" element={<InicioSesion />} />  {/* Página de Inicio de Sesión */}
      <Route path="/registro" element={<Registro />} />  {/* Página de Registro */}
      <Route path="/mapa" element={<Mapa />} />  {/* Ruta opcional al mapa */}  
      <Route path="/verificacion-exitosa" element={<VerificacionExitosa />} /> 
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verificar/:token" element={<Verificar />} />
    </Routes>
  );
};

export default AppRoutes;
