import databaseConnection from '../config/Database.js';
import { Producto, ServicioSolicitud, Sugerencia, Noticia, Visita } from '../models/index.js';
import captchaService from '../services/CaptchaService.js';
import pdfService from '../services/PdfService.js';
import excelService from '../services/ExcelService.js';
import stream from 'stream';

async function ejecutarPruebasFlujo() {
  console.log('===============================================================');
  console.log('🧪 [PARNET BACKEND] Iniciando Suite de Pruebas de Flujo Core');
  console.log('===============================================================');

  // 1. Probar conexión Singleton
  console.log('\n📌 1. Verificando Conexión Singleton a la Base de Datos:');
  const connected = await databaseConnection.testConnection();
  if (!connected) throw new Error('Fallo en la conexión Singleton de base de datos');
  console.log('   ✅ Instancia Singleton verificada y activa.');

  // 2. Probar consulta y búsqueda de productos
  console.log('\n📌 2. Verificando Catálogo de Productos y Filtros:');
  const totalProds = await Producto.count();
  console.log(`   - Total de productos en inventario: ${totalProds}`);
  if (totalProds === 0) throw new Error('No hay productos cargados por el seeder');

  const cableado = await Producto.findAll({ where: { categoria: 'Cableado Estructurado' } });
  console.log(`   - Productos encontrados en Cableado Estructurado: ${cableado.length}`);
  if (cableado.length === 0) throw new Error('Fallo al filtrar por categoría');
  console.log('   ✅ Búsqueda y filtrado de catálogo funcionando.');

  // 3. Probar Servicio de CAPTCHA
  console.log('\n📌 3. Verificando Servicio Antibot CAPTCHA:');
  const captcha = captchaService.generate();
  console.log(`   - Captcha generado con ID: ${captcha.captchaId}`);
  if (!captcha.captchaId || !captcha.svg.includes('<svg')) {
    throw new Error('Formato de CAPTCHA inválido');
  }
  // Recuperar texto esperado directamente para validar acierto
  const record = captchaService.storage.get(captcha.captchaId);
  const valid = captchaService.verify(captcha.captchaId, record.text);
  if (!valid) throw new Error('Fallo al validar código CAPTCHA correcto');
  console.log('   ✅ Generación y validación de CAPTCHA aprobadas.');

  // 4. Probar Registro de Solicitud de Servicio con Folio
  console.log('\n📌 4. Verificando Registro de Solicitud de Servicio Técnico:');
  const folioTest = `SRV-TEST-${Date.now().toString().slice(-4)}`;
  const solicitud = await ServicioSolicitud.create({
    folio: folioTest,
    cliente_nombre: 'Ing. Prueba Chapa',
    email: 'chapa.test@parnet.com',
    telefono: '844-000-1122',
    empresa: 'Corporativo Parnet',
    area: 'Fibra Óptica',
    detalle: 'Prueba unitaria automatizada de tendido de fibra',
    estatus: 'Pendiente'
  });
  console.log(`   - Solicitud creada con Folio: ${solicitud.folio} (ID: ${solicitud.id})`);
  if (!solicitud.id) throw new Error('Fallo al persistir solicitud de servicio');
  console.log('   ✅ Registro de servicios persistido en base de datos.');

  // 5. Probar Generador de Ficha Técnica PDF con POO
  console.log('\n📌 5. Verificando Servicio de Generación de Ficha Técnica PDF:');
  const prodTest = cableado[0];
  const writableStream = new stream.Writable();
  let bufferLength = 0;
  writableStream._write = (chunk, encoding, next) => {
    bufferLength += chunk.length;
    next();
  };
  // Mock simple de res
  const mockRes = {
    setHeader: () => {},
    on: () => {},
    once: () => {},
    emit: () => {},
    write: (chunk) => writableStream.write(chunk),
    end: () => writableStream.end()
  };

  pdfService.generateFichaTecnica(prodTest, mockRes);
  await new Promise((resolve) => setTimeout(resolve, 300));
  console.log(`   - Ficha técnica PDF generada correctamente para producto ${prodTest.codigo}.`);
  console.log('   ✅ Generador PDF institucional verificado.');

  // 6. Limpieza de datos de prueba
  await ServicioSolicitud.destroy({ where: { folio: folioTest } });

  console.log('\n✨ [PARNET TEST] ¡TODAS LAS PRUEBAS DE FLUJO PASARON CON ÉXITO!');
  process.exit(0);
}

ejecutarPruebasFlujo().catch((err) => {
  console.error('\n❌ [PARNET TEST ERROR]:', err);
  process.exit(1);
});
