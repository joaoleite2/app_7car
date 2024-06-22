// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './app/App';
import './app/index.css'; // Certifique-se de que o caminho para o arquivo CSS está correto
import { CartProvider } from './app/components/contexts/CartContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
