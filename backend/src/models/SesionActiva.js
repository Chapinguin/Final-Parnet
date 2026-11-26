import { DataTypes, Model } from 'sequelize';
import databaseConnection from '../config/Database.js';

const sequelize = databaseConnection.getSequelize();

export class SesionActiva extends Model {}

SesionActiva.init(
  {
    sessionId: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: 'session_id'
    },
    ruta: {
      type: DataTypes.STRING(200),
      allowNull: false,
      defaultValue: '/'
    },
    lastSeen: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'last_seen'
    }
  },
  {
    sequelize,
    modelName: 'SesionActiva',
    tableName: 'sesiones_activas',
    timestamps: false
  }
);
