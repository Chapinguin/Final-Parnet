import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { AlertCircle, FileSpreadsheet, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminSugerencias() {
  const [sugerencias, setSugerencias] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState('');
  const [error, setError] = useState('');

  const fetchSugerencias = async (currentPage = 1) => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get(`/sugerencias?page=${currentPage}&limit=8`);
      setSugerencias(res.data.data);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);
      setTotal(res.data.total);
    } catch (err) {
      setSugerencias([]);
      setError(err.response?.data?.message || 'No se pudieron cargar las sugerencias.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSugerencias(page);
  }, [page]);

  const handleExport = async (format) => {
    setError('');
    setExporting(format);

    try {
      const response = await api.get(`/sugerencias/export/${format}`, { responseType: 'blob' });
      const fileUrl = window.URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = format === 'excel' ? 'Sugerencias_Parnet.xlsx' : 'Reporte_Sugerencias_Parnet.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => window.URL.revokeObjectURL(fileUrl), 1000);
    } catch (requestError) {
      setError(
        requestError.response?.status === 401
          ? 'Tu sesión expiró. Inicia sesión nuevamente para exportar.'
          : `No se pudo exportar a ${format === 'excel' ? 'Excel' : 'PDF'}. Inténtalo de nuevo.`
      );
    } finally {
      setExporting('');
    }
  };

  return (
    <div>
      {error && (
        <div className="form-feedback form-feedback-error" role="alert">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: '#002b49', fontWeight: 800 }}>Listado de Sugerencias Paginadas</h2>
          <p style={{ color: '#475569' }}>Total de {total} sugerencias registradas en la base de datos interna.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <button
            onClick={() => handleExport('excel')}
            className="btn btn-outline"
            style={{ color: '#16a34a', borderColor: '#86efac' }}
            disabled={Boolean(exporting)}
          >
            <FileSpreadsheet size={16} /> {exporting === 'excel' ? 'Exportando...' : 'Exportar a Excel (.xlsx)'}
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="btn btn-outline"
            style={{ color: '#dc2626', borderColor: '#fca5a5' }}
            disabled={Boolean(exporting)}
          >
            <FileText size={16} /> {exporting === 'pdf' ? 'Exportando...' : 'Exportar a PDF'}
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

