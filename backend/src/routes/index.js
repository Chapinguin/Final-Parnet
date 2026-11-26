import { Router } from 'express';
import authRoutes from './authRoutes.js';
import productoRoutes from './productoRoutes.js';
import servicioRoutes from './servicioRoutes.js';
import sugerenciaRoutes from './sugerenciaRoutes.js';
import noticiaRoutes from './noticiaRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import captchaRoutes from './captchaRoutes.js';
import { enviarContacto } from '../controllers/contactoController.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/productos', productoRoutes);
apiRouter.use('/servicios', servicioRoutes);
apiRouter.use('/sugerencias', sugerenciaRoutes);
apiRouter.use('/noticias', noticiaRoutes);
apiRouter.use('/analytics', analyticsRoutes);
apiRouter.use('/captcha', captchaRoutes);

apiRouter.post('/contacto', enviarContacto);

export default apiRouter;

