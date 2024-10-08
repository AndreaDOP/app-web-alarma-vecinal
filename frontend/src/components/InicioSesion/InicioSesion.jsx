// InicioSesion.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function InicioSesion() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Limpia cualquier error anterior

    try {
      console.log('Iniciando petición a /auth/login');
      // Petición al backend para iniciar sesión
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Verifica si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('El servidor no devolvió un JSON válido.');
      }

      const data = await response.json();

      if (response.ok) {
        // Almacenar el token en localStorage o cookies
        localStorage.setItem('token', data.token);
        localStorage.setItem('currentUser', JSON.stringify(data.user));
        console.log(localStorage.getItem('currentUser'));
        alert('Inicio de sesión exitoso');
        navigate('/Conectados');
      } else {
        setError(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Error al iniciar sesión. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="container">
      <h2>Iniciar Sesión</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Muestra errores aquí */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>

      {/* Enlace a "Olvidaste tu contraseña" */}
      <div style={{ marginTop: '10px' }}>
        <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
      </div>
    </div>
  );
}

export default InicioSesion;

