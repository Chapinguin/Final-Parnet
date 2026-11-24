import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Newspaper } from 'lucide-react';
import api from '../services/api';

const initialForm = {
  titulo: '',
  contenido: '',
  categoria: 'General',
  imagen_url: ''
};

export default function AdminNoticias() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/noticias', form);
      setForm(initialForm);
      setSuccess('La noticia se publicó correctamente.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo publicar la noticia. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  return (
    <section>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#002b49', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Newspaper size={28} /> Publicar noticia
        </h2>
        <p style={{ color: '#475569' }}>Las noticias publicadas aparecerán en el portal público.</p>
      </div>

      <form className="form-box" onSubmit={handleSubmit} style={{ maxWidth: '760px' }}>
        {error && (
          <div className="form-feedback form-feedback-error" role="alert">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="form-feedback" role="status" style={{ background: '#ecfdf5', color: '#166534' }}>
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="noticia-titulo">Título *</label>
          <input
            id="noticia-titulo"
            className="form-input"
            name="titulo"
            type="text"
            value={form.titulo}
            onChange={handleChange}
            maxLength={200}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="noticia-contenido">Contenido *</label>
          <textarea
            id="noticia-contenido"
            className="form-textarea"
            name="contenido"
            rows={7}
            value={form.contenido}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="noticia-categoria">Categoría</label>
          <input
            id="noticia-categoria"
            className="form-input"
            name="categoria"
            type="text"
            value={form.categoria}
            onChange={handleChange}
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="noticia-imagen">URL de imagen</label>
          <input
            id="noticia-imagen"
            className="form-input"
            name="imagen_url"
            type="text"
            value={form.imagen_url}
            onChange={handleChange}
            maxLength={255}
            placeholder="https://... o /public/..."
          />
        </div>

        <button type="submit" className="btn btn-navy" disabled={loading}>
          {loading ? 'Publicando...' : 'Publicar noticia'}
        </button>
      </form>
    </section>
  );
}
