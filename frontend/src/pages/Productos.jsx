import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Search, FileText, CheckCircle2, XCircle } from 'lucide-react';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [search, setSearch] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const params = {};
      if (search) params.search = search;
      if (categoria) params.categoria = categoria;

      const res = await api.get('/productos', { params });
      setProductos(res.data);
    } catch (err) {
      console.error('Error obteniendo productos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, [categoria]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProductos();
  };

  const handleDownloadPdf = (id, codigo) => {
    window.open(`${api.defaults.baseURL}/productos/${id}/ficha-pdf`, '_blank');
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', color: '#002b49', fontWeight: 800 }}>Catálogo de Soluciones y Productos</h2>
        <p style={{ color: '#475569' }}>
          Equipamiento de telecomunicaciones con especificaciones técnicas certificadas y descarga de Ficha Técnica oficial en PDF.
        </p>
      </div>

      {/* Barra de Búsqueda y Filtros */}
      <div style={{ background: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', marginBottom: '2rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '240px', position: 'relative' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Buscar por nombre, código o palabra clave..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ width: '220px' }}>
            <select
              className="form-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              <option value="Cableado Estructurado">Cableado Estructurado</option>
              <option value="Fibra Óptica">Fibra Óptica</option>
              <option value="Redes y Telecomunicaciones">Redes y Telecomunicaciones</option>
              <option value="Telefonía IP">Telefonía IP</option>
              <option value="Redes Eléctricas">Redes Eléctricas</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            <Search size={16} /> Buscar
          </button>
        </form>
      </div>

      {/* Rejilla de Productos */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Cargando catálogo...</div>
      ) : productos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
          No se encontraron productos coincidentes con los criterios de búsqueda.
        </div>
      ) : (
        <div className="grid-cards">
          {productos.map((prod) => (
            <div key={prod.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '170px', borderRadius: '6px', overflow: 'hidden', marginBottom: '1rem', background: '#f8fafc' }}>
                <img
                  src={prod.imagen_url || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80'}
                  alt={prod.nombre}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0084c7' }}>{prod.codigo}</span>
                <span className={`badge ${prod.estatus === 'Existencia' ? 'badge-success' : 'badge-danger'}`}>
                  {prod.estatus === 'Existencia' ? 'En Existencia' : 'Agotado'}
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', color: '#002b49', fontWeight: 700, marginBottom: '0.5rem' }}>
                {prod.nombre}
              </h4>

              <p style={{ fontSize: '0.85rem', color: '#475569', flex: 1, marginBottom: '1rem' }}>
                {prod.descripcion}
              </p>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.8rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Precio Lista</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#002b49' }}>
                    ${Number(prod.precio).toFixed(2)} <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>MXN</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDownloadPdf(prod.id, prod.codigo)}
                  className="btn btn-outline"
                  style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}
                  title="Descargar Ficha Técnica PDF"
                >
                  <FileText size={14} color="#0084c7" /> Ficha PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

