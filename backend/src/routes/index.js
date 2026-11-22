import { Router } from 'express';
import authRoutes from './authRoutes.js';
import productoRoutes from './productoRoutes.js';
import servicioRoutes from './servicioRoutes.js';
import sugerenciaRoutes from './sugerenciaRoutes.js';
import noticiaRoutes from './noticiaRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import captchaRoutes from './captchaRoutes.js';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/productos', productoRoutes);
apiRouter.use('/servicios', servicioRoutes);
apiRouter.use('/sugerencias', sugerenciaRoutes);
apiRouter.use('/noticias', noticiaRoutes);
apiRouter.use('/analytics', analyticsRoutes);
apiRouter.use('/captcha', captchaRoutes);

// Endpoint de contacto general por correo simulado
apiRouter.post('/contacto', (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ message: 'Todos los campos son requeridos.' });
  }
  console.log(`📧 [Contacto Email Recibido] De: ${nombre} (${email}) | Asunto: ${asunto} | Mensaje: ${mensaje}`);
  return res.json({
    success: true,
    message: 'Mensaje de contacto enviado con éxito al departamento de atención al cliente.'
  });
});

export default apiRouter;

