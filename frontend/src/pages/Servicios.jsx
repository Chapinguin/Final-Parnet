import React, { useState } from 'react';
import api from '../services/api';
import CaptchaInput from '../components/CaptchaInput';
import { Wrench, CheckCircle, AlertCircle } from 'lucide-react';

export default function Servicios() {
  const [formData, setFormData] = useState({
    cliente_nombre: '',
    email: '',
    telefono: '',
    empresa: '',
    area: 'Redes y Telecomunicaciones',
    detalle: '',
    captcha: ''
  });
  const [captchaId, setCaptchaId] = useState('');
  const [status, setStatus] = useState({ type: '', msg: '', folio: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '', folio: '' });

    try {
      const res = await api.post('/servicios', {
        ...formData,
        captchaId
      });
      setStatus({
        type: 'success',
        msg: res.data.message || 'Solicitud de servicio registrada correctamente.',
        folio: res.data.folio
      });
      setFormData({
        cliente_nombre: '',
        email: '',
        telefono: '',
        empresa: '',
        area: 'Redes y Telecomunicaciones',
        detalle: '',
        captcha: ''
      });
    } catch (err) {
      setStatus({
        type: 'error',
        msg: err.response?.data?.message || 'Error al enviar solicitud. Verifique el código CAPTCHA.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#002b49', fontWeight: 800 }}>Solicitud de Servicios Especializados</h2>
        <p style={{ color: '#475569' }}>
          Complete el formulario técnico para solicitar levantamientos en sitio, certificaciones o mantenimiento de redes.
        </p>
      </div>

      <div className="form-box">
        {status.msg && (
          <div
            style={{
              padding: '1rem',
              borderRadius: '6px',
              marginBottom: '1.5rem',
              background: status.type === 'success' ? '#dcfce7' : '#fee2e2',
              color: status.type === 'success' ? '#166534' : '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem'
            }}
          >
            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
            <div>
              <strong>{status.msg}</strong>
              {status.folio && <div>Número de Folio asignado: <strong>{status.folio}</strong></div>}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre del Solicitante *</label>
            <input
              type="text"
              className="form-input"
              required
              value={formData.cliente_nombre}
              onChange={(e) => setFormData({ ...formData, cliente_nombre: e.target.value })}
              placeholder="Ej. Ing. Juan Pérez"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Correo Electrónico *</label>
              <input
                type="email"
                className="form-input"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan@empresa.com"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Teléfono de Contacto *</label>
              <input
                type="tel"
                className="form-input"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                placeholder="(844) 123-4567"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="form-label">Empresa / Razón Social</label>
              <input
                type="text"
                className="form-input"
                value={formData.empresa}
                onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                placeholder="Ej. Automotriz del Norte"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Área del Servicio Solicitado *</label>
              <select
                className="form-select"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
              >
                <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                <option value="Cableado Estructurado">Cableado Estructurado (Cobre Cat 6/6A)</option>
                <option value="Fibra Óptica">Fibra Óptica (Fusión y Certificación OTDR)</option>
                <option value="Telefonía IP">Telefonía IP y Comunicaciones Unificadas</option>
                <option value="Redes Eléctricas">Redes Eléctricas y Respaldo de Energía</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Detalle y Alcance del Requerimiento *</label>
            <textarea
              className="form-textarea"
              rows={4}
              required
              value={formData.detalle}
              onChange={(e) => setFormData({ ...formData, detalle: e.target.value })}
              placeholder="Describa el servicio requerido, número de nodos aproximados, ubicación del proyecto o problema existente..."
            />
          </div>

          <CaptchaInput
            captchaId={captchaId}
            setCaptchaId={setCaptchaId}
            value={formData.captcha}
            onChange={(val) => setFormData({ ...formData, captcha: val })}
          />

          <button type="submit" className="btn btn-navy" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            <Wrench size={18} /> {loading ? 'Enviando...' : 'Registrar Solicitud de Servicio'}
          </button>
        </form>
      </div>
    </div>
  );
}

