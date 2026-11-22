import { Router } from 'express';
import { getNoticias, createNoticia } from '../controllers/noticiaController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', getNoticias);
router.post('/', authMiddleware, createNoticia);

export default router;

