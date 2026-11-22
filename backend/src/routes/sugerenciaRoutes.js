import { Router } from 'express';
import {
  createSugerencia,
  getSugerencias,
  exportExcel,
  exportPdf
} from '../controllers/sugerenciaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Registro público con CAPTCHA
router.post('/', createSugerencia);

// Rutas protegidas para administración
router.get('/', authMiddleware, getSugerencias);
router.get('/export/excel', authMiddleware, exportExcel);
router.get('/export/pdf', authMiddleware, exportPdf);

export default router;

