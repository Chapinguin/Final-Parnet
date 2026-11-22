import { Router } from 'express';
import { createSolicitud, getSolicitudes } from '../controllers/servicioController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', createSolicitud);
router.get('/', authMiddleware, getSolicitudes);

export default router;

