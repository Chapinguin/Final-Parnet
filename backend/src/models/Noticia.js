import { DataTypes, Model } from 'sequelize';
import databaseConnection from '../config/Database.js';

const sequelize = databaseConnection.getSequelize();

export class Noticia extends Model {}

Noticia.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    contenido: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    categoria: {
      type: DataTypes.STRING(50),
      defaultValue: 'Tecnología'
    },
    imagen_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Noticia',
    tableName: 'noticias'
  }
);

