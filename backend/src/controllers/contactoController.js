import contactService from '../services/ContactService.js';

export const enviarContacto = async (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body || {};
  const campos = { nombre, email, telefono, asunto, mensaje };

  if (Object.values(campos).some((value) => typeof value !== 'string' || !value.trim())) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  if (nombre.length > 120 || email.length > 254 || telefono.length > 30 || asunto.length > 160 || mensaje.length > 5000) {
    return res.status(400).json({ message: 'Uno o más campos exceden la longitud permitida.' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ message: 'El correo electrónico no tiene un formato válido.' });
  }

  try {
    await contactService.send({
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      asunto: asunto.trim(),
      mensaje: mensaje.trim()
    });
    return res.status(202).json({ success: true, message: 'Tu mensaje fue enviado al equipo de Parnet Ingeniería.' });
  } catch (error) {
    console.error('No se pudo enviar el mensaje de contacto:', error.message);
    return res.status(error.statusCode || 502).json({
      message: error.statusCode === 503
        ? 'El servicio de correo no está configurado. Intenta más tarde.'
        : 'No fue posible enviar el mensaje. Intenta de nuevo más tarde.'
    });
  }
};
