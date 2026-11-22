import React, { useState } from 'react';
import api from '../services/api';
import CaptchaInput from '../components/CaptchaInput';
import { MessageSquareText, CheckCircle, AlertCircle } from 'lucide-react';

export default function Sugerencias() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
    captcha: ''
  });
  const [captchaId, setCaptchaId] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });

    try {
      const res = await api.post('/sugerencias', {
        ...formData,
        captchaId
      });

      setStatus({
        type: 'success',
        msg: res.data.message || 'Sugerencia registrada exitosamente en nuestra base de datos interna.'
      });

      setFormData({
        nombre: '',
        email: '',
        mensaje: '',
        captcha: ''
      });
    } catch (err) {
      setStatus({
        type: 'error',
        msg: err.response?.data?.message || 'Error al enviar sugerencia. Valide el código CAPTCHA.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#002b49', fontWeight: 800 }}>Buzón de Sugerencias para la Empresa</h2>
        <p style={{ color: '#475569' }}>
          Sus comentarios son almacenados directamente en la base de datos interna del sistema para revisión administrativa con control CAPTCHA.
        </p>
      </div>

      <div className="form-box">
        {status.msg && (
          <div
            style={{
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1.2rem',
              background: status.type === 'success' ? '#dcfce7' : '#fee2e2',
              color: status.type === 'success' ? '#166534' : '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            {status.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{status.msg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Su Nombre *</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="Ej. Roberto Sánchez"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Correo Electrónico *</label>
            <input
              type="email"
              className="form-input"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="roberto@correo.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Sugerencia / Retroalimentación *</label>
            <textarea
              className="form-textarea"
              rows={4}
              required
              value={formData.mensaje}
              onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
              placeholder="Comparta ideas de mejora en catálogo, tiempos de atención o servicios..."
            />
          </div>

          <CaptchaInput
            captchaId={captchaId}
            setCaptchaId={setCaptchaId}
            value={formData.captcha}
            onChange={(val) => setFormData({ ...formData, captcha: val })}
          />

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            <MessageSquareText size={18} /> {loading ? 'Registrando...' : 'Enviar Sugerencia a Base de Datos'}
          </button>
        </form>
      </div>
    </div>
  );
}

