import React from 'react';
import { ExternalLink } from 'lucide-react';

const clientesData = [
  {
    nombre: 'Cisco Systems',
    tipo: 'Socio de Infraestructura y Redes',
    url: 'https://www.cisco.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
    descripcion: 'Líder mundial en redes para Internet, conmutación y seguridad perimetral.'
  },
  {
    nombre: 'Panduit',
    tipo: 'Socio de Conectividad y Cableado',
    url: 'https://www.panduit.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Panduit_logo.svg',
    descripcion: 'Soluciones de infraestructura física y conectividad para centros de datos.'
  },
  {
    nombre: 'CommScope',
    tipo: 'Sistemas de Fibra y Cobre',
    url: 'https://www.commscope.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/CommScope_Logo.svg',
    descripcion: 'Tecnología de vanguardia para redes inalámbricas y cableado de alta velocidad.'
  },
  {
    nombre: 'Schneider Electric / APC',
    tipo: 'Energía y Respaldo Eléctrico',
    url: 'https://www.se.com',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Schneider_Electric_2007.svg',
    descripcion: 'Sistemas ininterrumpibles UPS y enfriamiento de precisión para salas MDF.'
  }
];

export default function Clientes() {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#002b49', fontWeight: 800 }}>Nuestros Clientes y Alianzas Estratégicas</h2>
        <p style={{ color: '#475569' }}>
          Empresas e instituciones que confían en las soluciones integrales de telecomunicaciones de PARNET Ingeniería.
        </p>
      </div>

      <div className="grid-cards">
        {clientesData.map((c, i) => (
          <div key={i} className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem' }}>
              <img
                src={c.logo}
                alt={c.nombre}
                style={{ maxHeight: '50px', maxWidth: '180px', objectFit: 'contain' }}
              />
            </div>
            <h4 style={{ fontSize: '1.15rem', color: '#002b49', fontWeight: 700, marginBottom: '0.4rem' }}>
              {c.nombre}
            </h4>
            <div style={{ fontSize: '0.8rem', color: '#0084c7', fontWeight: 600, marginBottom: '0.8rem' }}>
              {c.tipo}
            </div>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.2rem' }}>
              {c.descripcion}
            </p>
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-outline"
              style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
            >
              Visitar Sitio Oficial <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

