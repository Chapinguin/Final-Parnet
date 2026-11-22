import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Patrón de Diseño: SINGLETON
 * Garantiza una única instancia de la conexión a la base de datos relacional (Sequelize).
 */
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    const storagePath = process.env.DB_STORAGE || path.resolve(__dirname, '../../database.sqlite');

    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: storagePath,
      logging: process.env.NODE_ENV === 'test' ? false : false,
      define: {
        timestamps: true,
        underscored: true
      }
    });

    DatabaseConnection.instance = this;
  }

  getSequelize() {
    return this.sequelize;
  }

  async testConnection() {
    try {
      await this.sequelize.authenticate();
      console.log('✅ [Singleton] Conexión a la base de datos establecida exitosamente.');
      return true;
    } catch (error) {
      console.error('❌ [Singleton] Error al conectar con la base de datos:', error.message);
      throw error;
    }
  }
}

const databaseConnectionInstance = new DatabaseConnection();
export default databaseConnectionInstance;

