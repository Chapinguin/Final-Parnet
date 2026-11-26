import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api';
import { Eye, Activity } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const [stats, setStats] = useState({ totalVisitas: 0, usuariosConectados: 0 });
  const trackedPath = useRef(null);

  useEffect(() => {
    let sessionId = sessionStorage.getItem('parnet_session_id');
    if (!sessionId) {
      if (typeof crypto.randomUUID === 'function') {
        sessionId = crypto.randomUUID();
      } else {
        const bytes = crypto.getRandomValues(new Uint8Array(16));
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;
        const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
        sessionId = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
      }
      sessionStorage.setItem('parnet_session_id', sessionId);
    }

    const updateStats = async (recordPageView) => {
      try {
        if (recordPageView) {
          const { data } = await api.get(`/analytics/visitas?ruta=${encodeURIComponent(location.pathname)}`);
          setStats(data);
        }
        const { data } = await api.post('/analytics/presencia', { sessionId, ruta: location.pathname });
        setStats((current) => ({ ...current, usuariosConectados: data.usuariosConectados }));
      } catch {
        // Mantiene el último dato visible si el servidor está temporalmente fuera de línea.
      }
    };

    const shouldRecordPageView = trackedPath.current !== location.pathname;
    trackedPath.current = location.pathname;
    updateStats(shouldRecordPageView);
    const heartbeat = window.setInterval(() => updateStats(false), 60 * 1000);
    return () => window.clearInterval(heartbeat);
  }, [location.pathname]);

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
          <a href="/servicios">Solicitar una asesoría técnica →</a>
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

