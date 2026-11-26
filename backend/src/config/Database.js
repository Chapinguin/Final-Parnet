import { Sequelize } from 'sequelize';
import appConfig from './AppConfig.js';

/**
 * Patrón de Diseño: SINGLETON
 * Garantiza una única instancia de la conexión a la base de datos relacional (Sequelize).
 */
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }

    this.sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: appConfig.databaseStorage,
      logging: false,
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

