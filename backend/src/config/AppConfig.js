
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AppConfig {
  constructor() {
    if (AppConfig.instance) return AppConfig.instance;
    AppConfig.instance = this;
  }

  get port() {
    return Number(process.env.PORT) || 4000;
  }

  get nodeEnv() {
    return process.env.NODE_ENV || 'development';
  }

  get databaseStorage() {
    return process.env.DB_STORAGE || path.resolve(__dirname, '../../database.sqlite');
  }

  get jwtSecret() {
    const secret = process.env.JWT_SECRET?.trim();

    if (!secret || secret.length < 32) {
      throw new Error(
        'JWT_SECRET no está configurado o no cumple con la longitud mínima de 32 caracteres.'
      );
    }

    return secret;
  }

  get corsOrigins() {
    const configured = process.env.CORS_ORIGIN || '*';
    return configured.split(',').map((origin) => origin.trim()).filter(Boolean);
  }

  get contactEmail() {
    return {
      apiKey: process.env.RESEND_API_KEY || '',
      from: process.env.CONTACT_EMAIL_FROM || '',
      to: process.env.CONTACT_EMAIL_TO || ''
    };
  }
}

const appConfig = new AppConfig();

export { AppConfig };
export default appConfig;
