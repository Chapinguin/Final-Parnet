import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { RefreshCw } from 'lucide-react';

export default function CaptchaInput({ captchaId, setCaptchaId, value, onChange }) {
  const [svg, setSvg] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchCaptcha = async () => {
    try {
      setLoading(true);
      const res = await api.get('/captcha');
      setCaptchaId(res.data.captchaId);
      setSvg(res.data.svg);
    } catch (err) {
      console.error('Error cargando CAPTCHA:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaptcha();
  }, []);

  return (
    <div className="form-group">
      <label className="form-label">Control de Seguridad (CAPTCHA)</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.5rem' }}>
        <div
          dangerouslySetInnerHTML={{ __html: svg }}
          style={{
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            overflow: 'hidden',
            height: '46px',
            display: 'flex',
            alignItems: 'center'
          }}
        />
        <button
          type="button"
          onClick={fetchCaptcha}
          className="btn btn-outline"
          style={{ padding: '0.5rem 0.8rem' }}
          title="Recargar CAPTCHA"
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      <input
        type="text"
        className="form-input"
        placeholder="Ingrese el texto de la imagen"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}

