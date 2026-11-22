import { DataTypes, Model } from 'sequelize';
import databaseConnection from '../config/Database.js';

const sequelize = databaseConnection.getSequelize();

export class Producto extends Model {}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    codigo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(80),
      allowNull: false
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    especificaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    imagen_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    estatus: {
      type: DataTypes.ENUM('Existencia', 'Agotado'),
      defaultValue: 'Existencia',
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Producto',
    tableName: 'productos'
  }
);

