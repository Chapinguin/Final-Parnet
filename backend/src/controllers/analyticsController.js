import { Sequelize } from 'sequelize';
import { Visita, SesionActiva, ServicioSolicitud, Producto } from '../models/index.js';

const PRESENCE_TTL_MS = 2 * 60 * 1000;
const isSessionId = (value) => typeof value === 'string'
  && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export const registrarYObtenerVisitas = async (req, res) => {
  try {
    // Cada consulta representa una vista de página.
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    await Visita.create({
      ip: String(ip).substring(0, 45),
      userAgent: (req.headers['user-agent'] || '').substring(0, 250),
      ruta: String(req.query.ruta || '/').slice(0, 100)
    });

    const totalVisitas = await Visita.count();
    const usuariosConectados = await SesionActiva.count({
      where: {
        lastSeen: { [Sequelize.Op.gte]: new Date(Date.now() - PRESENCE_TTL_MS) }
      }
    });

    return res.json({
      totalVisitas,
      usuariosConectados
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al contabilizar visitas.' });
  }
};

export const registrarPresencia = async (req, res) => {
  const { sessionId, ruta } = req.body || {};
  if (!isSessionId(sessionId)) {
    return res.status(400).json({ message: 'Identificador de sesión inválido.' });
  }

  try {
    const activeSince = new Date(Date.now() - PRESENCE_TTL_MS);
    await SesionActiva.destroy({ where: { lastSeen: { [Sequelize.Op.lt]: activeSince } } });
    await SesionActiva.upsert({
      sessionId,
      ruta: typeof ruta === 'string' ? ruta.slice(0, 200) : '/',
      lastSeen: new Date()
    });
    const usuariosConectados = await SesionActiva.count({
      where: { lastSeen: { [Sequelize.Op.gte]: activeSince } }
    });
    return res.json({ usuariosConectados });
  } catch (error) {
    console.error('Error al actualizar presencia:', error);
    return res.status(500).json({ message: 'No se pudo actualizar la presencia.' });
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

