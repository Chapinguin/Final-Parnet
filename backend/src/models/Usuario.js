import { DataTypes, Model } from 'sequelize';
import databaseConnection from '../config/Database.js';

const sequelize = databaseConnection.getSequelize();

export class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    rol: {
      type: DataTypes.STRING(20),
      defaultValue: 'ADMIN'
    }
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios'
  }
);

