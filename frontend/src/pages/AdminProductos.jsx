import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { AlertCircle, Plus, Edit2, Trash2, FileSpreadsheet, Check, Printer, X } from 'lucide-react';

export default function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [reportLoading, setReportLoading] = useState(false);
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [reporteModalOpen, setReporteModalOpen] = useState(false);
  const [reporteStock, setReporteStock] = useState(null);

  const [form, setForm] = useState({
    id: null,
    codigo: '',
    nombre: '',
    categoria: 'Cableado Estructurado',
    descripcion: '',
    especificaciones: '',
    precio: '',
    imagen_url: '',
    estatus: 'Existencia'
  });

  const fetchProductos = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/productos');
      setProductos(res.data);
    } catch (err) {
      setProductos([]);
      setError(err.response?.data?.message || 'No se pudo cargar el catálogo de productos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const handleOpenCreate = () => {
    setFormError('');
    setForm({
      id: null,
      codigo: '',
      nombre: '',
      categoria: 'Cableado Estructurado',
      descripcion: '',
      especificaciones: '',
      precio: '',
      imagen_url: '',
      estatus: 'Existencia'
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setFormError('');
    setForm(p);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro de eliminar este producto del inventario?')) {
      try {
        setError('');
        await api.delete(`/productos/${id}`);
        await fetchProductos();
      } catch (err) {
        setError(err.response?.data?.message || 'No se pudo eliminar el producto.');
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setFormError('');
    setSaving(true);

    try {
      if (form.id) {
        await api.put(`/productos/${form.id}`, form);
      } else {
        await api.post('/productos', form);
      }
      setModalOpen(false);
      await fetchProductos();
    } catch (requestError) {
      setFormError(requestError.response?.data?.message || 'No se pudo guardar el producto. Verifica los datos.');
    } finally {
      setSaving(false);
    }
  };

  const handleVerReporteStock = async () => {
    setError('');
    setReportLoading(true);

    try {
      const res = await api.get('/productos/admin/reporte-stock');
      setReporteStock(res.data);
      setReporteModalOpen(true);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo cargar el reporte de inventario.');
    } finally {
      setReportLoading(false);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: '#002b49', fontWeight: 800 }}>Mantenimiento de Catálogos (CRUD)</h2>
          <p style={{ color: '#475569' }}>Altas, bajas, actualizaciones e imágenes de productos para administradores.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button onClick={handleVerReporteStock} className="btn btn-outline" disabled={reportLoading}>
            <FileSpreadsheet size={16} /> {reportLoading ? 'Cargando reporte...' : 'Reporte General de Stock'}
          </button>
          <button onClick={handleOpenCreate} className="btn btn-navy">
            <Plus size={16} /> Nuevo Producto
          </button>
        </div>
      </div>

      {error && (
        <div className="form-feedback form-feedback-error" role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Cargando catálogo...</div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre del Producto</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', color: '#64748b', padding: '1.5rem' }}>
                    No hay productos registrados.
                  </td>
                </tr>
              ) : productos.map((p) => (
                <tr key={p.id}>
                  <td><strong>{p.codigo}</strong></td>
                  <td>{p.nombre}</td>
                  <td>{p.categoria}</td>
                  <td>${Number(p.precio).toFixed(2)}</td>
                  <td>
                    <span className={`badge ${p.estatus === 'Existencia' ? 'badge-success' : 'badge-danger'}`}>
                      {p.estatus}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleOpenEdit(p)} className="btn btn-outline" style={{ padding: '0.3rem 0.5rem' }} title="Editar">
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="btn btn-outline" style={{ padding: '0.3rem 0.5rem', color: '#b91c1c' }} title="Eliminar">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de Crear / Editar */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: '1.2rem', color: '#002b49' }}>
              {form.id ? 'Editar Producto' : 'Registrar Nuevo Producto'}
            </h3>
            {formError && (
              <div className="form-feedback form-feedback-error" role="alert">
                <AlertCircle size={18} />
                <span>{formError}</span>
              </div>
            )}
            <form onSubmit={handleSave}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Código Único *</label>
                  <input
                    type="text"
                    className="form-input"
                    required
                    value={form.codigo}
                    onChange={(e) => setForm({ ...form, codigo: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Estatus de Inventario *</label>
                  <select
                    className="form-select"
                    value={form.estatus}
                    onChange={(e) => setForm({ ...form, estatus: e.target.value })}
                  >
                    <option value="Existencia">Existencia</option>
                    <option value="Agotado">Agotado</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nombre del Producto *</label>
                <input
                  type="text"
                  className="form-input"
                  required
                  value={form.nombre}
                  onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Categoría *</label>
                  <select
                    className="form-select"
                    value={form.categoria}
                    onChange={(e) => setForm({ ...form, categoria: e.target.value })}
                  >
                    <option value="Cableado Estructurado">Cableado Estructurado</option>
                    <option value="Fibra Óptica">Fibra Óptica</option>
                    <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
                    <option value="Telefonía IP">Telefonía IP</option>
                    <option value="Redes Eléctricas">Redes Eléctricas</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Precio (MXN) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    className="form-input"
                    required
                    value={form.precio}
                    onChange={(e) => setForm({ ...form, precio: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">URL de Imagen del Producto</label>
                <input
                  type="text"
                  className="form-input"
                  value={form.imagen_url}
                  onChange={(e) => setForm({ ...form, imagen_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label className="form-label">Descripción General *</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  required
                  value={form.descripcion}
                  onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Especificaciones Técnicas (Para Ficha PDF)</label>
                <textarea
                  className="form-textarea"
                  rows={3}
                  value={form.especificaciones}
                  onChange={(e) => setForm({ ...form, especificaciones: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} className="btn btn-outline" disabled={saving}>Cancelar</button>
                <button type="submit" className="btn btn-navy" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar Producto'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Reporte de Stock */}
      {reporteModalOpen && (
        <div className="stock-report-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div className="stock-report-content" style={{ background: '#ffffff', padding: '2rem', borderRadius: '8px', width: '90%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem' }}>
              <h3 style={{ color: '#002b49' }}>Reporte General de Productos y Stock</h3>
              <div className="no-print" style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => window.print()} className="btn btn-outline">
                  <Printer size={16} /> Imprimir
                </button>
                <button onClick={() => setReporteModalOpen(false)} className="btn btn-outline" style={{ padding: '0.2rem 0.5rem' }} aria-label="Cerrar reporte">
                  <X size={16} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem' }}>
              <div className="card" style={{ flex: 1, padding: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Total Productos</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{reporteStock?.resumen?.total}</div>
              </div>
              <div className="card" style={{ flex: 1, padding: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>En Existencia</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#16a34a' }}>{reporteStock?.resumen?.enExistencia}</div>
              </div>
              <div className="card" style={{ flex: 1, padding: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Agotados</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626' }}>{reporteStock?.resumen?.agotados}</div>
              </div>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th>Estatus</th>
                </tr>
              </thead>
              <tbody>
                {reporteStock?.listado?.map((item) => (
                  <tr key={item.id}>
                    <td><strong>{item.codigo}</strong></td>
                    <td>{item.nombre}</td>
                    <td>{item.categoria}</td>
                    <td>${Number(item.precio).toFixed(2)}</td>
                    <td>
                      <span className={`badge ${item.estatus === 'Existencia' ? 'badge-success' : 'badge-danger'}`}>
                        {item.estatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

