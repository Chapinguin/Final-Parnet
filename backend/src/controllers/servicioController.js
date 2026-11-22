import { ServicioSolicitud } from '../models/index.js';
import captchaService from '../services/CaptchaService.js';

export const createSolicitud = async (req, res) => {
  try {
    const { cliente_nombre, email, telefono, empresa, area, detalle, captcha, captchaId } = req.body;

    if (!cliente_nombre || !email || !telefono || !area || !detalle) {
      return res.status(400).json({ message: 'Todos los campos obligatorios deben completarse.' });
    }

    if (!captchaService.verify(captchaId, captcha)) {
      return res.status(400).json({ message: 'Código CAPTCHA inválido o expirado.' });
    }

    const folio = `SRV-${Date.now().toString().slice(-6)}`;

    const solicitud = await ServicioSolicitud.create({
      folio,
      cliente_nombre,
      email,
      telefono,
      empresa: empresa || 'Particular',
      area,
      detalle,
      estatus: 'Pendiente'
    });

    return res.status(201).json({
      success: true,
      message: 'Solicitud de servicio registrada con éxito.',
      folio: solicitud.folio,
      data: solicitud
    });
  } catch (error) {
    console.error('Error al registrar solicitud de servicio:', error);
    return res.status(500).json({ message: 'Error interno al registrar solicitud.' });
  }
};

export const getSolicitudes = async (req, res) => {
  try {
    const solicitudes = await ServicioSolicitud.findAll({
      order: [['created_at', 'DESC']]
    });
    return res.json(solicitudes);
  } catch (error) {
    return res.status(500).json({ message: 'Error al consultar solicitudes.' });
  }
};

