import React, { useState } from 'react';
import api from '../services/api';
import { Mail, CheckCircle, Send } from 'lucide-react';

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  });
  const [enviado, setEnviado] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/contacto', formData);
      setEnviado(true);
      setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch (err) {
      console.error('Error al enviar mensaje de contacto:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#002b49', fontWeight: 800 }}>Contacto por Correo Electrónico</h2>
        <p style={{ color: '#475569' }}>
          Envíenos su mensaje directamente. Nuestro departamento de atención le responderá a la brevedad.
        </p>
      </div>

      <div className="form-box">
        {enviado && (
          <div style={{ padding: '1rem', background: '#dcfce7', color: '#166534', borderRadius: '6px', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle size={18} />
            <span>Su mensaje ha sido enviado exitosamente a la bandeja de contacto de PARNET Ingeniería.</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre Completo *</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej. Ing. Laura Gómez"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico de Contacto *</label>
            <input
              type="email"
              className="form-input"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="laura@empresa.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Asunto *</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.asunto}
              onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
              placeholder="Cotización de cableado, soporte, dudas técnicas..."
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mensaje *</label>
            <textarea
              className="form-textarea"
              rows={5}
              required
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              placeholder="Escriba aquí los detalles de su consulta..."
            />
          </div>

          <button type="submit" className="btn btn-navy" style={{ width: '100%' }} disabled={loading}>
            <Send size={16} /> {loading ? 'Enviando...' : 'Enviar Correo Electrónico'}
          </button>
        </form>
      </div>
    </div>
  );
}

