import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Network, Home, Wrench, Package, Users, Mail, MessageSquareText, ShieldAlert, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('parnet_token');
  const user = JSON.parse(localStorage.getItem('parnet_user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('parnet_token');
    localStorage.removeItem('parnet_user');
    navigate('/admin/login');
  };

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <NavLink to="/" className="brand-logo">
            <span className="logo-badge">PARNET</span>
            <div className="brand-info">
              <h1>PARNET INGENIERÍA</h1>
              <p>Redes y Telecomunicaciones · Soluciones Integrales</p>
            </div>
          </NavLink>
          <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#93c5fd' }}>
            <div>Soporte Técnico Especializado: <strong>(844) 415-8890</strong></div>
            <div>Saltillo, Coahuila · México</div>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Home size={16} /> Inicio
        </NavLink>
        <NavLink to="/servicios" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Wrench size={16} /> Servicios
        </NavLink>
        <NavLink to="/productos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Package size={16} /> Productos
        </NavLink>
        <NavLink to="/clientes" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Users size={16} /> Clientes
        </NavLink>
        <NavLink to="/contacto" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Mail size={16} /> Contacto
        </NavLink>
        <NavLink to="/sugerencias" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <MessageSquareText size={16} /> Sugerencias
        </NavLink>

        {token ? (
          <>
            <NavLink to="/admin/dashboard" className={({ isActive }) => `nav-link admin-link ${isActive ? 'active' : ''}`}>
              <ShieldAlert size={16} /> Panel Admin ({user?.username})
            </NavLink>
            <button
              onClick={handleLogout}
              className="nav-link"
              style={{ background: '#b91c1c', border: 'none', cursor: 'pointer' }}
              title="Cerrar sesión"
            >
              <LogOut size={16} /> Salir
            </button>
          </>
        ) : (
          <NavLink to="/admin/login" className={({ isActive }) => `nav-link admin-link ${isActive ? 'active' : ''}`}>
            <ShieldAlert size={16} /> Acceso Admin
          </NavLink>
        )}
      </nav>
    </>
  );
}

