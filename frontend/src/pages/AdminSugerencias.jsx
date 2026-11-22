import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { FileSpreadsheet, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminSugerencias() {
  const [sugerencias, setSugerencias] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSugerencias = async (currentPage = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/sugerencias?page=${currentPage}&limit=8`);
      setSugerencias(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSugerencias(page);
  }, [page]);

  const handleExportExcel = () => {
    window.open(`${api.defaults.baseURL}/sugerencias/export/excel`, '_blank');
  };

  const handleExportPdf = () => {
    window.open(`${api.defaults.baseURL}/sugerencias/export/pdf`, '_blank');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: '#002b49', fontWeight: 800 }}>Listado de Sugerencias Paginadas</h2>
          <p style={{ color: '#475569' }}>Total de {total} sugerencias registradas en la base de datos interna.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button onClick={handleExportExcel} className="btn btn-outline" style={{ color: '#16a34a', borderColor: '#86efac' }}>
            <FileSpreadsheet size={16} /> Exportar a Excel (.xlsx)
          </button>
          <button onClick={handleExportPdf} className="btn btn-outline" style={{ color: '#dc2626', borderColor: '#fca5a5' }}>
            <FileText size={16} /> Exportar a PDF
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}>Cargando sugerencias...</div>
      ) : sugerencias.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No hay sugerencias registradas todavía.</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Remitente</th>
                  <th>Correo Electrónico</th>
                  <th>Mensaje / Sugerencia</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {sugerencias.map((s) => (
                  <tr key={s.id}>
                    <td><strong>#{s.id}</strong></td>
                    <td>{s.nombre}</td>
                    <td>{s.email}</td>
                    <td>{s.mensaje}</td>
                    <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                      {new Date(s.created_at || Date.now()).toLocaleDateString('es-MX')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Página {page} de {totalPages} (Mostrando {sugerencias.length} de {total} registros)
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.8rem' }}
              >
                <ChevronLeft size={16} /> Anterior
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="btn btn-outline"
                style={{ padding: '0.4rem 0.8rem' }}
              >
                Siguiente <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

