import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Lock, User, AlertCircle } from 'lucide-react';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('parnet_token', res.data.token);
      localStorage.setItem('parnet_user', JSON.stringify(res.data.user));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Error de autenticación. Verifique sus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto' }}>
      <div className="form-box" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.8rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.8rem', background: '#e0f2fe', borderRadius: '50%', color: '#0084c7', marginBottom: '0.8rem' }}>
            <Lock size={28} />
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#002b49', fontWeight: 800 }}>Acceso Administrativo</h2>
          <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Control Panel PARNET Ingeniería</p>
        </div>

        {error && (
          <div style={{ padding: '0.8rem', background: '#fee2e2', color: '#991b1b', borderRadius: '6px', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Usuario Administrador</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-navy" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Verificando...' : 'Iniciar Sesión Privada'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: '#64748b', textAlign: 'center', border: '1px dashed #cbd5e1' }}>
          <strong>Credenciales iniciales de evaluación:</strong><br />
          Usuario: <code>admin</code> · Contraseña: <code>AdminParnet2026!</code>
        </div>
      </div>
    </div>
  );
}

