import { Router } from 'express';
import { registrarYObtenerVisitas, getDashboardsData } from '../controllers/analyticsController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/visitas', registrarYObtenerVisitas);
router.get('/dashboards', authMiddleware, getDashboardsData);

export default router;

