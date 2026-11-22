import svgCaptcha from 'svg-captcha';
import crypto from 'crypto';

/**
 * Servicio de CAPTCHA con POO
 * Genera reto visual SVG y almacena temporalmente el texto esperado con expiración.
 */
class CaptchaService {
  constructor() {
    this.storage = new Map();
    // Limpieza periódica de captchas viejos cada 5 minutos
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  generate() {
    const captcha = svgCaptcha.create({
      size: 5,
      noise: 2,
      color: true,
      background: '#f1f5f9',
      width: 140,
      height: 44,
      fontSize: 38
    });

    const captchaId = crypto.randomUUID();
    this.storage.set(captchaId, {
      text: captcha.text.toLowerCase(),
      expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutos
    });

    return {
      captchaId,
      svg: captcha.data
    };
  }

  verify(captchaId, userInput) {
    if (!captchaId || !userInput) return false;

    const record = this.storage.get(captchaId);
    if (!record) return false;

    if (Date.now() > record.expiresAt) {
      this.storage.delete(captchaId);
      return false;
    }

    const isValid = record.text === String(userInput).trim().toLowerCase();
    this.storage.delete(captchaId); // Se invalida tras usarse
    return isValid;
  }

  cleanup() {
    const now = Date.now();
    for (const [id, record] of this.storage.entries()) {
      if (now > record.expiresAt) {
        this.storage.delete(id);
      }
    }
  }
}

const captchaService = new CaptchaService();
export default captchaService;

