# Documentación Técnica Oficial — Parnet Ingeniería
**Evaluación Ordinaria / Proyecto Integrador**  
*Desarrollo de Software Web · UAdeC — Facultad de Sistemas*

---

## 1. Análisis de Requerimientos (-5 pts si no se entrega)

### 1.1 Propósito y Alcance del Sistema
El proyecto **Parnet Ingeniería** es una plataforma web integral desarrollada para una empresa especializada en telecomunicaciones, cableado estructurado, fibra óptica, telefonía IP y redes eléctricas. El sistema unifica una experiencia pública para clientes y prospectos con una zona administrativa privada para control de inventarios, analítica de negocio y gestión de sugerencias.

### 1.2 Requerimientos Funcionales (RF)
- **RF-01:** Portal web acorde al diseño conceptual suministrado en Photoshop (`Redes_y_Telecomunicaciones.psd`).
- **RF-02:** Slider de imágenes y promociones dinámicas en la cabecera.
- **RF-03:** Catálogo público de productos con buscador en vivo por código, nombre o categoría.
- **RF-04:** Generación y descarga directa de **Ficha Técnica en PDF** por cada producto.
- **RF-05:** Formulario público de solicitud de servicios por áreas técnicas con **control de seguridad CAPTCHA**.
- **RF-06:** Formulario de sugerencias para la empresa almacenado en tabla interna con **control CAPTCHA**.
- **RF-07:** Panel administrativo para visualización paginada de sugerencias y exportación a **Excel (`.xlsx`)** y **PDF**.
- **RF-08:** Formulario de contacto por correo electrónico.
- **RF-09:** Sección institucional de clientes con logotipos y enlaces web externos.
- **RF-10:** Tablero de noticias dinámico administrado desde la base de datos.
- **RF-11:** Módulo multimedia con video institucional explicativo (2 a 4 minutos) y reproductor de audio.
- **RF-12:** Mantenimiento (CRUD completo) de productos: altas, bajas, modificaciones y estatus de inventario (*Existencia* / *Agotado*).
- **RF-13:** Reporte general de catálogo y stock de productos.
- **RF-14:** Dos tableros analíticos (**Dashboards con gráficos**):
  - Gráfico 1: Análisis de solicitudes de servicio por área tecnológica.
  - Gráfico 2: Registro por tipo de producto en catálogo.
- **RF-15:** Contador en tiempo real de visitas acumuladas y usuarios conectados concurrentes.

### 1.3 Requerimientos No Funcionales (RNF)
- **RNF-01 (Prohibición estricta):** Implementación sin utilizar PHP; backend estructurado en Node.js / Express.
- **RNF-02 (Paradigma):** Totalmente orientado al paradigma de **Programación Orientada a Objetos (POO)**.
- **RNF-03 (Arquitectura):** Separación de capas MVC (Modelo-Vista-Controlador) y Frontend desacoplado con React (Vite).
- **RNF-04 (Persistencia):** Uso obligatorio de **ORM (Sequelize)** con base de datos relacional portátil (SQLite).
- **RNF-05 (Patrón de Diseño):** Implementación del patrón de diseño creacional **Singleton** para la conexión a la base de datos.
- **RNF-06 (Diseño Responsivo y Compatibilidad):** Interfaz fluida adaptable a dispositivos móviles, tablets y escritorio, con compatibilidad verificada en Chrome, Edge, Firefox y Safari.

---

## 2. Diseño y Arquitectura de Software (-5 pts si no se entrega)

### 2.1 Estilo Arquitectónico Monorepo Desacoplado
El sistema se organiza en dos capas independientes conectadas mediante una **API REST**:
1. **Capa de Presentación (Frontend SPA):** React 18, Vite, React Router DOM, Chart.js y estilos CSS institucionales.
2. **Capa de Servicios y Negocio (Backend MVC POO):** Node.js, Express, Middlewares de autenticación JWT y Capa de Servicios (`PdfService`, `ExcelService`, `CaptchaService`).
3. **Capa de Datos y Persistencia:** ORM Sequelize administrado por el Singleton `DatabaseConnection`; la configuración compartida se centraliza en `AppConfig`.

```
┌──────────────────────────────────────────────────────────────┐
│                    NAVEGADOR CLIENTE (SPA)                   │
│   React 18 + Vite · Router · Chart.js · CSS Responsivo PSD   │
└──────────────────────────────┬───────────────────────────────┘
                               │ HTTPS / JSON (REST API)
┌──────────────────────────────▼───────────────────────────────┐
│                    BACKEND CORE (EXPRESS + POO)              │
│  ├── Rutas & Controladores (/api/productos, /auth, etc.)     │
│  ├── Middlewares (authMiddleware, CORS, BodyParser)          │
│  └── Capa de Servicios (PdfService, ExcelService, Captcha)   │
└──────────────────────────────┬───────────────────────────────┘
                               │ Conexión Única (Patrón Singleton)
┌──────────────────────────────▼───────────────────────────────┐
│                    ORM SEQUELIZE + SQLite / DB               │
│   Modelos: Usuario, Producto, ServicioSolicitud, Sugerencia  │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 Patrón de Diseño: SINGLETON
Implementado para la base de datos en `backend/src/config/Database.js` y para la configuración global en `backend/src/config/AppConfig.js`. Ambos módulos reutilizan una instancia única; AppConfig carga `.env` antes de que Sequelize lea su ruta de almacenamiento y centraliza puerto, CORS, JWT y correo:

```javascript
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.sqlite' });
    DatabaseConnection.instance = this;
  }
  getSequelize() { return this.sequelize; }
}
```

```javascript
class AppConfig {
  constructor() {
    if (AppConfig.instance) return AppConfig.instance;
    AppConfig.instance = this;
  }
  get port() { return Number(process.env.PORT) || 4000; }
  get jwtSecret() { return process.env.JWT_SECRET || 'ParnetIngenieriaSecret2026!'; }
}
```

---

## 3. Modelo Físico de la Base de Datos (-5 pts si no se entrega)

```
┌─────────────────────────┐         ┌─────────────────────────┐
│        usuarios         │         │        productos        │
├─────────────────────────┤         ├─────────────────────────┤
│ id (PK, INT, AUTO)      │         │ id (PK, INT, AUTO)      │
│ username (VARCHAR(50))  │         │ codigo (VARCHAR(50))    │
│ password (VARCHAR(255)) │         │ nombre (VARCHAR(150))   │
│ email (VARCHAR(100))    │         │ categoria (VARCHAR(80)) │
│ rol (VARCHAR(20))       │         │ descripcion (TEXT)      │
│ created_at / updated_at │         │ especificaciones (TEXT) │
└─────────────────────────┘         │ precio (DECIMAL(10,2))  │
                                    │ imagen_url (VARCHAR)    │
┌─────────────────────────┐         │ estatus (ENUM:          │
│  servicios_solicitudes  │         │  'Existencia','Agotado')│
├─────────────────────────┤         │ created_at / updated_at │
│ id (PK, INT, AUTO)      │         └─────────────────────────┘
│ folio (VARCHAR(30))     │
│ cliente_nombre (VARCHAR)│         ┌─────────────────────────┐
│ email (VARCHAR(100))    │         │       sugerencias       │
│ telefono (VARCHAR(30))  │         ├─────────────────────────┤
│ empresa (VARCHAR(120))  │         │ id (PK, INT, AUTO)      │
│ area (VARCHAR(80))      │         │ nombre (VARCHAR(100))   │
│ detalle (TEXT)          │         │ email (VARCHAR(100))    │
│ estatus (ENUM:          │         │ mensaje (TEXT)          │
│  'Pendiente',           │         │ created_at / updated_at │
│  'En Atencion',         │         └─────────────────────────┘
│  'Resuelto')            │
│ created_at / updated_at │         ┌─────────────────────────┐
└─────────────────────────┘         │        noticias         │
                                    ├─────────────────────────┤
┌─────────────────────────┐         │ id (PK, INT, AUTO)      │
│         visitas         │         │ titulo (VARCHAR(200))   │
├─────────────────────────┤         │ contenido (TEXT)        │
│ id (PK, INT, AUTO)      │         │ categoria (VARCHAR(50)) │
│ ip (VARCHAR(50))        │         │ imagen_url (VARCHAR)    │
│ userAgent (VARCHAR)     │         │ activo (BOOLEAN)        │
│ ruta (VARCHAR(100))     │         │ created_at / updated_at │
│ created_at / updated_at │         └─────────────────────────┘
└─────────────────────────┘
```

---

La tabla `sesiones_activas` completa el esquema para presencia concurrente: su identificador UUID es clave primaria, y conserva la ruta actual y la fecha del último latido. El contador considera conectadas las sesiones actualizadas durante los dos minutos anteriores.

| Tabla | Campo | Tipo | Restricciones / propósito |
|:---|:---|:---|:---|
| `sesiones_activas` | `session_id` | `VARCHAR(36)` | PK; UUID de la sesión del navegador |
| `sesiones_activas` | `ruta` | `VARCHAR(200)` | Ruta que reportó el último latido |
| `sesiones_activas` | `last_seen` | `DATETIME` | Fecha del último latido; ventana de actividad de dos minutos |

## 4. Programación y Buenas Prácticas (POO) (-5 pts si no se entrega)

1. **Clases y Modelos POO:** Todos los modelos extienden de `Model` de Sequelize con atributos tipados y encapsulados.
2. **Servicios Especializados:** Clases con responsabilidades únicas:
   - `PdfService`: Encapsula la diagramación vectorial en `PDFKit` (márgenes, tipografías, tablas y cabeceras).
   - `ExcelService`: Encapsula la generación de libros `ExcelJS` con estilos de celda.
   - `CaptchaService`: Encapsula la generación de retos SVG y limpieza con expiración temporal.
3. **Estructura Óptima de Directorios:**
   - Separación rigurosa de `config/`, `controllers/`, `database/`, `middlewares/`, `models/`, `routes/`, `services/`, `tests/`.

---

## 5. Pruebas de Software (-5 pts si no se entrega)

El sistema incluye una suite de pruebas automatizadas ejecutables vía consola:

### 5.1 Suite de Flujo (`npm run test:flow`)
- Valida la conexión Singleton a la base de datos.
- Valida las consultas del catálogo y filtrado por categoría.
- Valida la generación y verificación del token CAPTCHA.
- Valida el registro transaccional de una solicitud de servicio técnico con folio autogenerado.
- Valida la generación binaria de la Ficha Técnica en PDF.

### 5.2 Suite de Seguridad (`npm run test:security`)
- Valida el cifrado unidireccional `bcrypt` de credenciales.
- Valida el rechazo de contraseñas erróneas.
- Valida la emisión, firma y verificación de tokens `jsonwebtoken` (JWT).
- Valida el rechazo inmediato de tokens alterados o falsificados.

---

## 6. Implementación y Despliegue (-5 pts si no se entrega)

### Requisitos de Ejecución
- Node.js versión 18+ o 20+.
- Gestor de paquetes `npm`.

### Procedimiento de Puesta en Marcha

```bash
# 0. Configurar contacto por correo (requiere API key y dominio verificado en Resend)
cp backend/.env.example backend/.env
# Completar RESEND_API_KEY, CONTACT_EMAIL_FROM y CONTACT_EMAIL_TO

# 1. Puesta en marcha del Backend (Terminal 1)
cd backend
npm install
npm run seed              # Inicializa la base de datos relacional y datos de prueba
npm run dev               # Servidor activo en http://localhost:4000

# 2. Puesta en marcha del Frontend (Terminal 2)
cd frontend
npm install
npm run dev               # Portal web activo en http://localhost:5173
```

### Empaquetado Limpio para Entrega (ZIP)
Ejecutar el script provisto en la raíz del proyecto:
```bash
./scripts/empaquetar.sh
```
El script genera un archivo `.zip` excluyendo carpetas pesadas (`node_modules`), compilados temporales (`dist`), historiales git y secretos de entorno (`.env`).

---

## 7. Diagrama de Gantt y Asignación de Roles (-50 pts si no se entrega)

El plan maestro contiene la asignación de tareas y su duración semanal estimada. El calendario está expresado en semanas relativas porque el repositorio no registra fechas de inicio verificables:
👉 **[PLAN_DE_TRABAJO.md](../PLAN_DE_TRABAJO.md)**

### Configuración del correo

El endpoint de contacto envía mensajes por Resend. Copie `backend/.env.example` a `backend/.env`, configure una clave API y una dirección remitente de dominio verificado por el proveedor. El destinatario se establece en `CONTACT_EMAIL_TO`. Sin estos valores, la API responde `503` y la interfaz no anuncia un envío exitoso.

### Presencia de visitantes

El frontend genera un UUID por sesión de pestaña y envía un latido cada minuto. El backend guarda el último latido en `sesiones_activas`, elimina registros vencidos y cuenta sesiones activas dentro de una ventana de dos minutos. El total de visitas se incrementa por ruta navegada.
