import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/index.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña requeridos.'
      });
    }

    const usuario = await Usuario.findOne({ where: { username } });
    if (!usuario) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas.'
      });
    }

    const isValidPassword = await bcrypt.compare(password, usuario.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas.'
      });
    }

    if (usuario.rol !== 'ADMIN') {
      return res.status(403).json({
        success: false,
        message: 'Acceso restringido a administradores.'
      });
    }

    const secret = process.env.JWT_SECRET || 'ParnetIngenieriaSecret2026!';
    const token = jwt.sign(
      {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        rol: usuario.rol
      },
      secret,
      { expiresIn: '8h' }
    );

    return res.json({
      success: true,
      message: 'Autenticación exitosa',
      token,
      user: {
        id: usuario.id,
        username: usuario.username,
        email: usuario.email,
        rol: usuario.rol
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({
      success: false,
      message: 'Error en el servidor al autenticar.'
    });
  }
};

export const verify = (req, res) => {
  return res.json({
    valid: true,
    user: req.user
  });
};

