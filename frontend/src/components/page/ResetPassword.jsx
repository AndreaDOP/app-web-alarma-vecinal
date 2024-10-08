// ResetPassword.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Importa useParams y useNavigate

function ResetPassword() {
  const { token } = useParams();  // Obtiene el token de la URL
  const navigate = useNavigate();  // Inicializa useNavigate para la redirección
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Contraseña restablecida exitosamente.');
        navigate('/inicio-sesion');  // Redirige a la página de inicio de sesión
      } else {
        setErrorMessage(data.message || 'Error al restablecer la contraseña.');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      setErrorMessage('Error al restablecer la contraseña. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="container">
      <h2>Restablecer Contraseña</h2>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">Nueva Contraseña:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Restablecer Contraseña</button>
      </form>
    </div>
  );
}

export default ResetPassword;
