import { DataTypes, Model } from 'sequelize';
import databaseConnection from '../config/Database.js';

const sequelize = databaseConnection.getSequelize();

export class Visita extends Model {}

Visita.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    ip: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    userAgent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ruta: {
      type: DataTypes.STRING(100),
      defaultValue: '/'
    }
  },
  {
    sequelize,
    modelName: 'Visita',
    tableName: 'visitas'
  }
);

