import databaseConnection from '../config/Database.js';
import { Usuario } from './Usuario.js';
import { Producto } from './Producto.js';
import { ServicioSolicitud } from './ServicioSolicitud.js';
import { Sugerencia } from './Sugerencia.js';
import { Noticia } from './Noticia.js';
import { Visita } from './Visita.js';
import { SesionActiva } from './SesionActiva.js';

const sequelize = databaseConnection.getSequelize();

export {
  sequelize,
  databaseConnection,
  Usuario,
  Producto,
  ServicioSolicitud,
  Sugerencia,
  Noticia,
  Visita,
  SesionActiva
};

