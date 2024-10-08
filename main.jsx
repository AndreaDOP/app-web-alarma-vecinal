
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './frontend/src/components/App'; // Ruta correcta de App.jsx
import './frontend/src/components/index.css'; // Ruta correcta de index.css
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
