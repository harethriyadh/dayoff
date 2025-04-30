import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import LoginPage from './pages/login';
import RegisterPage from "./pages/register";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from "./pages/index";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/index" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);