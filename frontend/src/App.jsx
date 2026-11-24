import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Productos from './pages/Productos';
import Clientes from './pages/Clientes';
import Contacto from './pages/Contacto';
import Sugerencias from './pages/Sugerencias';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductos from './pages/AdminProductos';
import AdminSugerencias from './pages/AdminSugerencias';
import AdminNoticias from './pages/AdminNoticias';

export default function App() {
  return (
    <BrowserRouter>
      <div className="site-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/sugerencias" element={<Sugerencias />} />

            {/* Rutas Administrativas y Privadas */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/productos"
              element={
                <ProtectedRoute>
                  <AdminProductos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/sugerencias"
              element={
                <ProtectedRoute>
                  <AdminSugerencias />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/noticias"
              element={
                <ProtectedRoute>
                  <AdminNoticias />
                </ProtectedRoute>
              }
            />

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

