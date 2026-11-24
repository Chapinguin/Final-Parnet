import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    tag: 'Telecomunicaciones y Datos',
    title: 'Soluciones Integrales de Voz, Datos y Fibra Óptica',
    desc: 'Suministramos infraestructura de última generación para satisfacer las demandas más exigentes de conectividad empresarial.',
    cta: 'Ver Catálogo de Productos',
    link: '/productos'
  },
  {
    tag: 'Cableado Estructurado',
    title: 'Certificación de Redes y Enlaces Industriales',
    desc: 'Diseño e implementación de centros de cableado, gabinetes de comunicaciones y canalizaciones bajo normas internacionales.',
    cta: 'Solicitar Servicio Especializado',
    link: '/servicios'
  },
  {
    tag: 'Alianzas Tecnológicas',
    title: 'Integración con Líderes Mundiales de Redes',
    desc: 'Equipamiento de alta gama, routers, switches administrables y conmutadores telefónicos IP con soporte garantizado.',
    cta: 'Conocer Nuestros Clientes',
    link: '/clientes'
  }
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <div className={`slider-container slider-slide-${current}`} aria-live="polite">
      <div className="slider-slide">
        <span className="slider-tag">{slide.tag}</span>
        <h2>{slide.title}</h2>
        <p>{slide.desc}</p>
        <Link to={slide.link} className="btn btn-primary">
          {slide.cta} <ArrowRight size={16} />
        </Link>
      </div>

      <div className="slider-nav">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`slider-dot ${idx === current ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

