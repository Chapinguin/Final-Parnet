import { Router } from 'express';
import { registrarYObtenerVisitas, registrarPresencia, getDashboardsData } from '../controllers/analyticsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/visitas', registrarYObtenerVisitas);
router.post('/presencia', registrarPresencia);
router.get('/dashboards', authMiddleware, getDashboardsData);

export default router;

