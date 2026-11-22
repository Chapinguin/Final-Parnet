# Parnet Ingeniería — Sistema Web Integral

Aplicación web empresarial desarrollada para **Parnet Ingeniería** como proyecto integrador y evaluación ordinaria. Integra medios de multimedia, frontend moderno responsivo desacoplado, backend orientado a objetos bajo arquitectura MVC, persistencia mediante ORM con patrón Singleton, generación de fichas técnicas en PDF, exportación de reportes a Excel, formularios con control CAPTCHA y dos dashboards de analítica de negocio.

---

## 👥 Equipo de Desarrollo
- **Chapa (Sebastian)** — Backend Core, Arquitectura MVC, Singleton & ORM, Generación de Fichas PDF (`chapabranch`)
- **Frida** — Frontend Portal Público, Mockup PSD, Slider, Formularios CAPTCHA y Multimedia (`fridabranch`)
- **Job** — Módulo Administrativo, Autenticación, CRUD de Productos, Visor/Exportador de Sugerencias y Dashboards (`jobbranch`)

---

## 📋 Documentación de Planificación y Arquitectura
- 👉 **[Plan de Trabajo, Asignación de Roles y Diagrama de Gantt](PLAN_DE_TRABAJO.md)**
- 👉 **[Contrato de Especificación de la API REST](docs/CONTRATO_API.md)**

---

## 🏛️ Stack Tecnológico
- **Frontend:** React 18 + Vite, React Router DOM, diseño responsivo fiel a `Redes_y_Telecomunicaciones.psd`.
- **Backend:** Node.js con Express, estructura modular MVC y Programación Orientada a Objetos (POO).
- **Persistencia / ORM:** Sequelize con base de datos relacional (SQLite autónomo portátil para entrega, configurable a MySQL/PostgreSQL).
- **Patrones de Diseño:** *Singleton* para la conexión de base de datos y configuración global; *Service Layer* para desacoplamiento de reglas de negocio.
- **Herramientas de Soporte:** `pdfkit` (fichas técnicas PDF), `xlsx`/`exceljs` (exportación Excel), `svg-captcha` (seguridad antibot) y `chart.js` (dashboards).

---

## 🚀 Flujo de Trabajo en Git
1. **Ramas Personales:** Cada integrante trabaja exclusivamente en su rama (`chapabranch`, `fridabranch`, `jobbranch`).
2. **Sincronización:** Hacer `git pull origin main` antes de iniciar cada sesión.
3. **Integración:** Crear Pull Requests hacia `main` al finalizar componentes funcionales.
4. **Commits:** Redactados en español siguiendo el estándar convencional (`feat:`, `fix:`, `docs:`, `refactor:`).
