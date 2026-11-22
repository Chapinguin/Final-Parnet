import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Package, MessageSquareText, Activity, ShieldCheck } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/analytics/dashboards')
      .then((res) => setData(res.data))
      .catch((err) => console.error('Error cargando dashboards:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>Cargando analítica de dashboards...</div>;
  }

  // Configuración de Gráfico 1: Servicios por Área
  const barData = {
    labels: data?.dashboardServicios?.map((s) => s.area) || [],
    datasets: [
      {
        label: 'Solicitudes Registradas',
        data: data?.dashboardServicios?.map((s) => s.total) || [],
        backgroundColor: ['#002b49', '#0084c7', '#38bdf8', '#0284c7', '#0369a1']
      }
    ]
  };

  // Configuración de Gráfico 2: Catálogo de Productos por Categoría
  const pieData = {
    labels: data?.dashboardProductos?.map((p) => p.categoria) || [],
    datasets: [
      {
        label: 'Productos Ofertados',
        data: data?.dashboardProductos?.map((p) => p.total) || [],
        backgroundColor: ['#002b49', '#0084c7', '#10b981', '#f59e0b', '#8b5cf6']
      }
    ]
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.8rem', color: '#002b49', fontWeight: 800 }}>Panel Administrativo y Analítica BI</h2>
          <p style={{ color: '#475569' }}>Métricas en tiempo real, control de catálogos y reportes para Parnet Ingeniería.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.8rem' }}>
          <Link to="/admin/productos" className="btn btn-navy">
            <Package size={16} /> Mantenimiento de Productos
          </Link>
          <Link to="/admin/sugerencias" className="btn btn-primary">
            <MessageSquareText size={16} /> Ver Sugerencias
          </Link>
        </div>
      </div>

      {/* Tarjetas de Resumen */}
      <div className="grid-cards" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ borderLeft: '4px solid #0084c7' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Total Productos en Catálogo</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#002b49' }}>
            {data?.resumenStock?.totalProductos || 0}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#16a34a' }}>
            {data?.resumenStock?.enExistencia || 0} En Existencia · {data?.resumenStock?.agotados || 0} Agotados
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.85rem', color: '#64748b' }}>Seguridad del Sistema</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.4rem' }}>
            <ShieldCheck size={20} /> Autenticación JWT Activa
          </div>
          <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.2rem' }}>
            Sesión con rol de administrador verificado.
          </div>
        </div>
      </div>

      {/* Los 2 Dashboards Gráficos (Rúbrica de 5 pts) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '2rem' }}>
        {/* Dashboard 1: Análisis de servicios */}
        <div className="card">
          <h4 style={{ fontSize: '1.1rem', color: '#002b49', fontWeight: 700, marginBottom: '1rem' }}>
            📊 Dashboard 1: Análisis de Solicitudes de Servicios por Área
          </h4>
          <div style={{ maxHeight: '280px', display: 'flex', justifyContent: 'center' }}>
            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false }
                }
              }}
            />
          </div>
        </div>

        {/* Dashboard 2: Registro por tipo de producto */}
        <div className="card">
          <h4 style={{ fontSize: '1.1rem', color: '#002b49', fontWeight: 700, marginBottom: '1rem' }}>
            🍩 Dashboard 2: Registro por Tipo de Productos Ofertados
          </h4>
          <div style={{ maxHeight: '280px', display: 'flex', justifyContent: 'center' }}>
            <Pie
              data={pieData}
              options={{
                responsive: true
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

