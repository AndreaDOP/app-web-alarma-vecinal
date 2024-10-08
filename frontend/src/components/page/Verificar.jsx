// Verificar
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Verificar() {
  const { token } = useParams(); // Extraer el token de la URL
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verificarToken = async () => {
      try {
        const response = await fetch(`http://localhost:5000/auth/verificar/${token}`, {
          method: 'GET',
        });
        const data = await response.json();

        if (response.ok) {
          setMessage('Cuenta verificada exitosamente');
          setTimeout(() => navigate('/conectados'), 3000); // Redirigir a "Conectados" después de 3 segundos
        } else {
          setMessage(data.message || 'Error al verificar la cuenta');
        }
      } catch (error) {
        setMessage('Error de servidor al verificar la cuenta');
      }
    };

    verificarToken();
  }, [token, navigate]);

  return (
    <div className="container">
      <h2>Verificación de Cuenta</h2>
      <p>{message}</p>
    </div>
  );
}

export default Verificar;
