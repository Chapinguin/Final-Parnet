import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking');
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    let active = true;
    const token = localStorage.getItem('parnet_token');

    if (!token) {
      setStatus('unauthenticated');
      return () => {
        active = false;
      };
    }

    setStatus('checking');
    api.get('/auth/verify')
      .then(() => {
        if (active) setStatus('authenticated');
      })
      .catch((error) => {
        if (!active) return;
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem('parnet_token');
          localStorage.removeItem('parnet_user');
          setStatus('unauthenticated');
          return;
        }
        setStatus('error');
      });

    return () => {
      active = false;
    };
  }, [retry]);

  if (status === 'checking') {
    return <div role="status" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Verificando sesión administrativa...</div>;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/admin/login" replace />;
  }

  if (status === 'error') {
    return (
      <div role="alert" style={{ textAlign: 'center', padding: '3rem', color: '#991b1b' }}>
        <p>No se pudo verificar la sesión. Comprueba tu conexión e inténtalo de nuevo.</p>
        <button className="btn btn-outline" onClick={() => setRetry((attempt) => attempt + 1)}>
          Reintentar
        </button>
      </div>
    );
  }

  return children;
}

