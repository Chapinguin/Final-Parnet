import appConfig from '../config/AppConfig.js';

class ContactService {
  async send({ nombre, email, telefono, asunto, mensaje }) {
    const { apiKey, from, to } = appConfig.contactEmail;
    if (!apiKey || !from || !to) {
      const error = new Error('Falta configurar Resend y las direcciones de contacto.');
      error.statusCode = 503;
      throw error;
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Contacto Parnet: ${asunto}`,
        text: [
          `Nombre: ${nombre}`,
          `Correo: ${email}`,
          `Teléfono: ${telefono}`,
          `Asunto: ${asunto}`,
          '',
          mensaje
        ].join('\n')
      })
    });

    if (!response.ok) {
      const error = new Error(`El proveedor de correo respondió HTTP ${response.status}.`);
      error.statusCode = 502;
      throw error;
    }
  }
}

export default new ContactService();
