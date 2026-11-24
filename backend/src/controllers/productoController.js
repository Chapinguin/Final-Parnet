import { Op } from 'sequelize';
import { Producto } from '../models/index.js';
import pdfService from '../services/PdfService.js';

export const getProductos = async (req, res) => {
  try {
    const { search, categoria, estatus } = req.query;
    const where = {};

    if (search) {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${search}%` } },
        { codigo: { [Op.like]: `%${search}%` } },
        { categoria: { [Op.like]: `%${search}%` } },
        { descripcion: { [Op.like]: `%${search}%` } }
      ];
    }

    if (categoria) {
      where.categoria = categoria;
    }

    if (estatus) {
      where.estatus = estatus;
    }

    const productos = await Producto.findAll({
      where,
      order: [['nombre', 'ASC']]
    });

    return res.json(productos);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    return res.status(500).json({ message: 'Error al consultar productos.' });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ message: 'Error al obtener producto.' });
  }
};

export const createProducto = async (req, res) => {
  try {
    const { codigo, nombre, categoria, descripcion, especificaciones, precio, imagen_url, estatus } = req.body;

    const nuevo = await Producto.create({
      codigo,
      nombre,
      categoria,
      descripcion,
      especificaciones,
      precio: precio || 0,
      imagen_url: imagen_url || '/placeholder_prod.jpg',
      estatus: estatus || 'Existencia'
    });

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente.',
      data: nuevo
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    return res.status(500).json({ message: 'Error al registrar producto.' });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    await producto.update(req.body);
    return res.json({
      success: true,
      message: 'Producto actualizado exitosamente.',
      data: producto
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al actualizar producto.' });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    await producto.destroy();
    return res.json({
      success: true,
      message: 'Producto eliminado correctamente.'
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al eliminar producto.' });
  }
};

export const descargarFichaTecnica = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado.' });
    }

    return pdfService.generateFichaTecnica(producto, res);
  } catch (error) {
    console.error('Error al generar PDF de ficha técnica:', error);
    return res.status(500).json({ message: 'Error al generar la ficha técnica en PDF.' });
  }
};

export const getReporteStock = async (req, res) => {
  try {
    const total = await Producto.count();
    const enExistencia = await Producto.count({ where: { estatus: 'Existencia' } });
    const agotados = await Producto.count({ where: { estatus: 'Agotado' } });
    const listado = await Producto.findAll({
      attributes: ['id', 'codigo', 'nombre', 'categoria', 'precio', 'estatus'],
      order: [['estatus', 'ASC'], ['nombre', 'ASC']]
    });

    return res.json({
      resumen: {
        total,
        enExistencia,
        agotados
      },
      listado
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al generar reporte de stock.' });
  }
};

