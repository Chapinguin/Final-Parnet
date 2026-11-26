import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import appConfig from './config/AppConfig.js';
import databaseConnection from './config/Database.js';
import apiRouter from './routes/index.js';
import { runSeeders } from './database/seeders.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = appConfig.port;

// Middlewares
app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = appConfig.corsOrigins;
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (imágenes o descargas)
app.use('/public', express.static(path.resolve(__dirname, '../public')));

// Rutas de API
app.use('/api', apiRouter);

// Ruta de comprobación de salud
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    system: 'Parnet Ingeniería Web API',
    timestamp: new Date().toISOString()
  });
});

// Inicialización del servidor y conexión Singleton a BD
const startServer = async () => {
  try {
    await databaseConnection.testConnection();
    await databaseConnection.getSequelize().sync();
    await runSeeders();

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(`🚀 [PARNET BACKEND] Servidor activo en http://localhost:${PORT}`);
      console.log(`📡 [API REST] Endpoints disponibles en http://localhost:${PORT}/api`);
      console.log(`====================================================`);
    });
  } catch (error) {
    console.error('❌ Error crítico al inicializar el backend:', error);
    process.exit(1);
  }
};

startServer();

export default app;

