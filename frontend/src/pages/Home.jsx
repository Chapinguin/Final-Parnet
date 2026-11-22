import React, { useEffect, useState } from 'react';
import Slider from '../components/Slider';
import api from '../services/api';
import { Network, Server, Cpu, ShieldCheck, Newspaper, Video, Volume2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    api.get('/noticias')
      .then((res) => setNoticias(res.data))
      .catch((err) => console.error('Error cargando noticias:', err));
  }, []);

  return (
    <div>
      <Slider />

      {/* Sección Áreas de Ingeniería */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 style={{ fontSize: '1.6rem', color: '#002b49', marginBottom: '0.4rem', fontWeight: 800 }}>
          Áreas de Soluciones PARNET
        </h3>
        <p style={{ color: '#475569', marginBottom: '1.5rem' }}>
          Especialización técnica integral en infraestructura de red empresarial, cableado y telecomunicaciones.
        </p>

        <div className="grid-cards">
          <div className="card">
            <div style={{ color: '#0084c7', marginBottom: '0.8rem' }}><Network size={32} /></div>
            <h4 className="card-title">Redes y Telecomunicaciones</h4>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Diseño, conmutación y enrutamiento de alta disponibilidad. Enlaces dedicados de voz y datos con equipos de nivel portador.
            </p>
          </div>

          <div className="card">
            <div style={{ color: '#0084c7', marginBottom: '0.8rem' }}><Server size={32} /></div>
            <h4 className="card-title">Cableado Estructurado y Fibra</h4>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Tendido, conectorización y certificación de cable UTP Cat 6/6A y enlaces de fibra óptica monomodo/multimodo.
            </p>
          </div>

          <div className="card">
            <div style={{ color: '#0084c7', marginBottom: '0.8rem' }}><Cpu size={32} /></div>
            <h4 className="card-title">Telefonía IP y Comunicaciones</h4>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Conmutadores virtuales SIP, telefonía corporativa unificada, extensiones móviles y audio conferencia empresarial.
            </p>
          </div>

          <div className="card">
            <div style={{ color: '#0084c7', marginBottom: '0.8rem' }}><ShieldCheck size={32} /></div>
            <h4 className="card-title">Redes Eléctricas y Respaldo</h4>
            <p style={{ fontSize: '0.9rem', color: '#475569' }}>
              Tierras físicas, acondicionamiento de potencia eléctrica para cuartos de servidores (MDF) y sistemas ininterrumpibles UPS.
            </p>
          </div>
        </div>
      </section>

      {/* Sección Multimedia (Video explicativo de 2 a 4 min y Audio) */}
      <section style={{ marginBottom: '3rem', background: '#f8fafc', padding: '2rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#002b49', marginBottom: '0.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Video size={22} color="#0084c7" /> Video Institucional: Calidad en Proyectos y Filosofía PARNET
        </h3>
        <p style={{ color: '#475569', marginBottom: '1.2rem', fontSize: '0.95rem' }}>
          Conozca la visión de PARNET Ingeniería, nuestros estándares de calidad en implementación y consejos técnicos para infraestructura de datos.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <video
              controls
              style={{ width: '100%', maxHeight: '280px', borderRadius: '6px', background: '#000000' }}
              poster="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
              Su navegador no soporta reproducción de video HTML5.
            </video>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.4rem' }}>
              Duración: 2:45 min · Video demostrativo de estándares y objetivos PARNET.
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#002b49', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Volume2 size={20} color="#0084c7" /> Audio Corporativo y Consejos de Telecomunicaciones
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>
              Escuche las recomendaciones de nuestros ingenieros sobre protección contra sobretensiones y buenas prácticas en cableado.
            </p>
            <audio controls style={{ width: '100%', marginBottom: '1rem' }}>
              <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg" />
              Su navegador no soporta el elemento de audio.
            </audio>
            <div style={{ background: '#e0f2fe', padding: '0.8rem', borderRadius: '6px', fontSize: '0.85rem', color: '#0369a1' }}>
              💡 <strong>¿Sabías que?</strong> Un cableado estructurado bajo norma ANSI/TIA 568-C extiende la vida útil de su red corporativa hasta por 15 años.
            </div>
          </div>
        </div>
      </section>

      {/* Tablero de Noticias Dinámicas */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
          <div>
            <h3 style={{ fontSize: '1.4rem', color: '#002b49', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Newspaper size={20} color="#0084c7" /> Tablero Dinámico de Noticias
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Actualizaciones tecnológicas generadas directamente desde nuestra base de datos.</p>
          </div>
        </div>

        <div className="grid-cards">
          {noticias.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="badge badge-warning" style={{ alignSelf: 'flex-start', marginBottom: '0.6rem' }}>
                {item.categoria || 'Noticia'}
              </span>
              <h4 style={{ fontSize: '1.05rem', color: '#002b49', marginBottom: '0.6rem', fontWeight: 700 }}>
                {item.titulo}
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#475569', flex: 1, marginBottom: '1rem' }}>
                {item.contenido}
              </p>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', borderTop: '1px solid #f1f5f9', paddingTop: '0.6rem' }}>
                Publicado: {new Date(item.created_at || Date.now()).toLocaleDateString('es-MX')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

