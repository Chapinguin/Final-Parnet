import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Eye, Activity } from 'lucide-react';

export default function Footer() {
  const [stats, setStats] = useState({ totalVisitas: 1, usuariosConectados: 1 });

  useEffect(() => {
    api.get('/analytics/visitas?ruta=' + encodeURIComponent(window.location.pathname))
      .then((res) => setStats(res.data))
      .catch(() => {});
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-col">
          <h4>Parnet Ingeniería</h4>
          <p>Líderes en diseño, instalación y certificación de redes empresariales, cableado estructurado y telecomunicaciones.</p>
        </div>
        <div className="footer-col">
          <h4>Áreas Tecnológicas</h4>
          <p>• Redes de Voz y Datos</p>
          <p>• Fibra Óptica Monomodo y Multimodo</p>
          <p>• Telefonía IP y Conmutadores SIP</p>
          <p>• Redes Eléctricas y Respaldo UPS</p>
        </div>
        <div className="footer-col">
          <h4>Contacto Corporativo</h4>
          <p>Dirección: Saltillo, Coahuila, México</p>
          <p>Correo: contacto@parnet.com.mx</p>
          <p>Teléfono: (844) 415-8890</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © 2026 Parnet Ingeniería. Todos los derechos reservados. Proyecto Integrador.
        </div>
        <div className="stats-counter">
          <span className="stat-pill">
            <Eye size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            Visitas: <strong>{stats.totalVisitas}</strong>
          </span>
          <span className="stat-pill">
            <Activity size={14} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }} />
            Usuarios Conectados: <strong>{stats.usuariosConectados}</strong>
          </span>
        </div>
      </div>
    </footer>
  );
}

