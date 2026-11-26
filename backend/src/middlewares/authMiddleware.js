import jwt from 'jsonwebtoken';
import appConfig from '../config/AppConfig.js';

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Acceso no autorizado. Token no proporcionado.'
    });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, appConfig.jwtSecret);
    if (decoded.rol !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Acceso restringido a administradores.'
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado. Inicie sesión nuevamente.'
    });
  }
};

