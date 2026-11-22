import bcrypt from 'bcryptjs';
import databaseConnection from '../config/Database.js';
import { Usuario, Producto, Noticia, Sugerencia, ServicioSolicitud, Visita } from '../models/index.js';

export const runSeeders = async () => {
  try {
    const sequelize = databaseConnection.getSequelize();
    await sequelize.sync({ force: false });

    // 1. Usuario Administrador
    const adminExists = await Usuario.findOne({ where: { username: 'admin' } });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('AdminParnet2026!', 10);
      await Usuario.create({
        username: 'admin',
        password: hashedPassword,
        email: 'contacto@parnet.com.mx',
        rol: 'ADMIN'
      });
      console.log('👤 [Seeder] Usuario administrador creado (admin / AdminParnet2026!).');
    }

    // 2. Catálogo de Productos
    const productosCount = await Producto.count();
    if (productosCount === 0) {
      const productosData = [
        {
          codigo: 'CAB-UTP-CAT6',
          nombre: 'Bobina de Cable UTP Cat 6 (305m)',
          categoria: 'Cableado Estructurado',
          descripcion: 'Cable de cobre de alta velocidad diseñado para redes de datos Gigabit Ethernet y telefonía.',
          especificaciones: 'Calibre 23 AWG, 4 pares trenzados, chaqueta PVC azul, 250 MHz, norma ANSI/TIA-568-C.2.',
          precio: 2450.00,
          imagen_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
          estatus: 'Existencia'
        },
        {
          codigo: 'FIB-MONO-12H',
          nombre: 'Cable de Fibra Óptica Monomodo 12 Hilos',
          categoria: 'Fibra Óptica',
          descripcion: 'Fibra óptica monomodo dieléctrica para tendidos aéreos o canalizaciones subterráneas.',
          especificaciones: '9/125 um G.652D, cubierta PE anti-UV, resistente a la intemperie, buffer holgado.',
          precio: 4890.00,
          imagen_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
          estatus: 'Existencia'
        },
        {
          codigo: 'SW-GIG-24P',
          nombre: 'Switch Administrable Gigabit 24 Puertos PoE+',
          categoria: 'Redes y Telecomunicaciones',
          descripcion: 'Switch empresarial capa 2+ con 24 puertos Gigabit PoE+ y 4 ranuras SFP para enlaces de fibra.',
          especificaciones: 'Capacidad de conmutación 56 Gbps, 370W PoE budget, VLANs 802.1Q, QoS avanzado.',
          precio: 12300.00,
          imagen_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
          estatus: 'Existencia'
        },
        {
          codigo: 'TEL-IP-EXEC',
          nombre: 'Teléfono IP Empresarial de 4 Líneas',
          categoria: 'Telefonía IP',
          descripcion: 'Teléfono IP corporativo con pantalla retroiluminada a color, audio HD y soporte PoE.',
          especificaciones: 'Soporte protocolo SIP, doble puerto Gigabit Ethernet, códec Opus, manos libres full-duplex.',
          precio: 1950.00,
          imagen_url: 'https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&w=400&q=80',
          estatus: 'Existencia'
        },
        {
          codigo: 'RCK-MUR-12U',
          nombre: 'Gabinete de Pared para Servidores 12U',
          categoria: 'Cableado Estructurado',
          descripcion: 'Gabinete metálico de 19 pulgadas para montaje de switches, patch panels y equipo de telecom.',
          especificaciones: 'Profundidad 600mm, puerta de cristal templado con cerradura, paneles laterales desmontables.',
          precio: 3600.00,
          imagen_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
          estatus: 'Agotado'
        },
        {
          codigo: 'UPS-ONL-2KVA',
          nombre: 'UPS Online Doble Conversión 2000VA / 1800W',
          categoria: 'Redes Eléctricas',
          descripcion: 'Sistema de alimentación ininterrumpida de grado médico e industrial para cuartos de datos (MDF/IDF).',
          especificaciones: 'Onda senoidal pura, factor de potencia 0.9, pantalla LCD de monitoreo, tiempo de transferencia 0ms.',
          precio: 14500.00,
          imagen_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
          estatus: 'Existencia'
        }
      ];

      await Producto.bulkCreate(productosData);
      console.log('📦 [Seeder] Catálogo de productos inicial cargado.');
    }

    // 3. Noticias Dinámicas
    const noticiasCount = await Noticia.count();
    if (noticiasCount === 0) {
      const noticiasData = [
        {
          titulo: 'Alianzas Estratégicas en Telecomunicaciones',
          contenido: 'Parnet Ingeniería consolida convenios de integración con marcas líderes en redes para Internet y telefonía IP.',
          categoria: 'Alianzas',
          imagen_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
          activo: true
        },
        {
          titulo: 'Modernización de Infraestructura de Fibra Óptica',
          contenido: 'Implementamos nuevos tendidos de fibra óptica de alta velocidad para plantas industriales y corporativos.',
          categoria: 'Infraestructura',
          imagen_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
          activo: true
        },
        {
          titulo: 'Soluciones Integrales de Voz y Datos 2026',
          contenido: 'Nuestra empresa tiene como objetivo suministrar Soluciones Integrales en Telecomunicaciones (Voz y Datos) que resuelvan necesidades empresariales.',
          categoria: 'Servicios',
          imagen_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=400&q=80',
          activo: true
        }
      ];
      await Noticia.bulkCreate(noticiasData);
      console.log('📰 [Seeder] Tablero de noticias dinámicas inicializado.');
    }

    // 4. Solicitudes de Servicio iniciales (para dashboards)
    const solicitudesCount = await ServicioSolicitud.count();
    if (solicitudesCount === 0) {
      await ServicioSolicitud.bulkCreate([
        {
          folio: 'SRV-100201',
          cliente_nombre: 'Ing. Fernando Ramos',
          email: 'f.ramos@automotriz.com',
          telefono: '844-411-2233',
          empresa: 'Manufactura Saltillo',
          area: 'Redes y Telecomunicaciones',
          detalle: 'Enlace inalámbrico punto a punto entre bodegas A y C.',
          estatus: 'Resuelto'
        },
        {
          folio: 'SRV-100202',
          cliente_nombre: 'Lic. Mariana Soto',
          email: 'msoto@logistica.mx',
          telefono: '844-322-9988',
          empresa: 'Transportes del Norte',
          area: 'Cableado Estructurado',
          detalle: 'Certificación de 48 nodos Cat 6 en nuevo edificio.',
          estatus: 'En Atencion'
        },
        {
          folio: 'SRV-100203',
          cliente_nombre: 'Ing. Alberto Garza',
          email: 'agarza@metalurgica.com',
          telefono: '844-555-1234',
          empresa: 'Acero Inoxidable S.A.',
          area: 'Fibra Óptica',
          detalle: 'Fusión y pruebas OTDR en anillo perimetral de fibra óptica.',
          estatus: 'Pendiente'
        },
        {
          folio: 'SRV-100204',
          cliente_nombre: 'Dr. Roberto Dávila',
          email: 'rdavila@clinicas.com',
          telefono: '844-777-6655',
          empresa: 'Centro Médico Especializado',
          area: 'Telefonía IP',
          detalle: 'Instalación de conmutador virtual SIP y 20 terminales IP.',
          estatus: 'Resuelto'
        }
      ]);
      console.log('🛠️ [Seeder] Solicitudes de servicio de prueba creadas.');
    }

    // 5. Sugerencias iniciales
    const sugerenciasCount = await Sugerencia.count();
    if (sugerenciasCount === 0) {
      await Sugerencia.bulkCreate([
        {
          nombre: 'Lic. Claudia Morales',
          email: 'claudia@coahuila.gob.mx',
          mensaje: 'Excelente atención técnica y cumplimiento de estándares de cableado.'
        },
        {
          nombre: 'Ing. Javier Ortiz',
          email: 'jortiz@telecom.org',
          mensaje: 'Sugerimos incluir switches de 48 puertos PoE en el catálogo descargable.'
        }
      ]);
      console.log('💡 [Seeder] Sugerencias de prueba registradas.');
    }

    // 6. Registro inicial de visitas
    const visitasCount = await Visita.count();
    if (visitasCount === 0) {
      await Visita.bulkCreate([
        { ip: '127.0.0.1', userAgent: 'Mozilla/5.0 (Init Test)', ruta: '/' },
        { ip: '127.0.0.1', userAgent: 'Mozilla/5.0 (Init Test)', ruta: '/productos' },
        { ip: '127.0.0.1', userAgent: 'Mozilla/5.0 (Init Test)', ruta: '/servicios' }
      ]);
    }
  } catch (error) {
    console.error('❌ Error ejecutando seeders:', error);
  }
};

// Permite ejecutar `node src/database/seeders.js` directamente
if (process.argv[1]?.endsWith('seeders.js')) {
  runSeeders().then(() => {
    console.log('🏁 Seeders finalizados.');
    process.exit(0);
  });
}

