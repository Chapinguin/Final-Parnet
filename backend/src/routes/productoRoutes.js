import { Router } from 'express';
import {
  getProductos,
  getProductoById,
  createProducto,
  updateProducto,
  deleteProducto,
  descargarFichaTecnica,
  getReporteStock
} from '../controllers/productoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Rutas públicas
router.get('/', getProductos);
router.get('/:id/ficha-pdf', descargarFichaTecnica);
router.get('/:id', getProductoById);

// Rutas protegidas para administradores
router.get('/admin/reporte-stock', authMiddleware, getReporteStock);
router.post('/', authMiddleware, createProducto);
router.put('/:id', authMiddleware, updateProducto);
router.delete('/:id', authMiddleware, deleteProducto);

export default router;

