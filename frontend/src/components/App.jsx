// App.jsx
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import AppRoutes from '../routes'; // Importar el componente de rutas
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid d-flex justify-content-between">
          {/* Logo a la izquierda */}
          <Link to="/" className="navbar-brand">
            <img src="/Alarma.png" alt="Logo Alarma Vecinal" height="40" />
          </Link> 
        </div>        
      </nav>
      {/* Usar las rutas importadas */}
      <AppRoutes />
    </Router>
  );
}

export default App;
