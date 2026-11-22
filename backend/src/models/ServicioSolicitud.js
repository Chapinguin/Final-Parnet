import { DataTypes, Model } from 'sequelize';
import databaseConnection from '../config/Database.js';

const sequelize = databaseConnection.getSequelize();

export class ServicioSolicitud extends Model {}

ServicioSolicitud.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    folio: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    cliente_nombre: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    telefono: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    empresa: {
      type: DataTypes.STRING(120),
      allowNull: true
    },
    area: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    detalle: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    estatus: {
      type: DataTypes.ENUM('Pendiente', 'En Atencion', 'Resuelto'),
      defaultValue: 'Pendiente'
    }
  },
  {
    sequelize,
    modelName: 'ServicioSolicitud',
    tableName: 'servicios_solicitudes'
  }
);

