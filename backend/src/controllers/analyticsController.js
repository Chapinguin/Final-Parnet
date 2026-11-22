import { Sequelize } from 'sequelize';
import { Visita, ServicioSolicitud, Producto } from '../models/index.js';

export const registrarYObtenerVisitas = async (req, res) => {
  try {
    // Registrar la visita actual
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    await Visita.create({
      ip: String(ip).substring(0, 45),
      userAgent: (req.headers['user-agent'] || '').substring(0, 250),
      ruta: req.query.ruta || '/'
    });

    const totalVisitas = await Visita.count();
    // Simulación estimada de usuarios conectados en los últimos 15 min + base
    const conexionesRecientes = await Visita.count({
      where: {
        created_at: {
          [Sequelize.Op.gte]: new Date(Date.now() - 15 * 60 * 1000)
        }
      }
    });

    const usuariosConectados = Math.max(3, conexionesRecientes + 1);

    return res.json({
      totalVisitas,
      usuariosConectados
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al contabilizar visitas.' });
  }
};

export const getDashboardsData = async (req, res) => {
  try {
    // 1. Dashboard de solicitudes de servicios por área
    const serviciosPorArea = await ServicioSolicitud.findAll({
      attributes: ['area', [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']],
      group: ['area'],
      raw: true
    });

    // 2. Dashboard de productos ofertados por categoría
    const productosPorCategoria = await Producto.findAll({
      attributes: ['categoria', [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']],
      group: ['categoria'],
      raw: true
    });

    // Resumen de inventario
    const totalProductos = await Producto.count();
    const enExistencia = await Producto.count({ where: { estatus: 'Existencia' } });
    const agotados = await Producto.count({ where: { estatus: 'Agotado' } });

    return res.json({
      dashboardServicios: serviciosPorArea.map(r => ({ area: r.area, total: Number(r.total) })),
      dashboardProductos: productosPorCategoria.map(r => ({ categoria: r.categoria, total: Number(r.total) })),
      resumenStock: {
        totalProductos,
        enExistencia,
        agotados
      }
    });
  } catch (error) {
    console.error('Error en dashboards analytics:', error);
    return res.status(500).json({ message: 'Error al obtener datos de dashboards.' });
  }
};

