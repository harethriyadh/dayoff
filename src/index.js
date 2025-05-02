import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './components/auth.css';
import './styles/css/tabler.min.css';
import './styles/css/tabler-flags.min.css';
import './styles/css/tabler-socials.min.css';
import './styles/css/tabler-payments.min.css';
import './styles/css/tabler-vendors.min.css';
import './styles/css/tabler-marketing.min.css';
import './styles/css/demo.min.css';
import './styles/rtl.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);