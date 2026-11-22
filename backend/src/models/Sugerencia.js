import { DataTypes, Model } from 'sequelize';
import databaseConnection from '../config/Database.js';

const sequelize = databaseConnection.getSequelize();

export class Sugerencia extends Model {}

Sugerencia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    mensaje: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Sugerencia',
    tableName: 'sugerencias'
  }
);

