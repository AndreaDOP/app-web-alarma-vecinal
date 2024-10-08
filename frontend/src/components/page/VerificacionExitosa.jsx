// VerificacionExitosa
import React from 'react';

const VerificacionExitosa = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>¡Cuenta Verificada!</h1>
      <p>Tu cuenta ha sido verificada exitosamente. Ya puedes acceder al sistema.</p>
      <a href="/login" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
        Iniciar Sesión
      </a>
    </div>
  );
};

export default VerificacionExitosa;
