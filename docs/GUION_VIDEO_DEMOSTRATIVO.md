# Guion Técnico Oficial para Grabación de Video Demostrativo
**Proyecto Final:** Parnet Ingeniería  
**Duración Objetivo:** 3 minutos y 10 segundos (Rango oficial permitido: **2 a 4 minutos**)  
**Cumplimiento de Rúbrica:** Requisito 13 y Punto Tecnológico VIDEO (-2 pts / Evaluación Ordinaria)

---

## 📋 Resumen de Criterios Obligatorios del Video
1. **Duración:** 2 a 4 minutos (Estricto).
2. **Contenido:** 
   - Explicar el objetivo y finalidad de la página.
   - Explicar el uso de calidad en los proyectos y normativas de ingeniería.
   - Brindar consejos técnicos o recomendaciones para clientes de telecomunicaciones.
   - Demostración visual de los puntos clave del sistema web (públicos y administrativos).

---

## 🎬 Guion Cronometrado Segundo a Segundo

### Escena 1: Presentación y Objetivo de la Plataforma (0:00 - 0:45)
- **Captura / Vista en Pantalla:** `01_home_inicio.png`
  - Mostrar el encabezado institucional, el Slider dinámico y las áreas de ingeniería.
- **Puntos de la Rúbrica Demostrados:** 
  - *Sitio acorde al diseño Photoshop (3 pts)*
  - *Slider en sección marcada (2 pts)*
  - *Objetivo y finalidad de la página (Requisito Video)*
- **Voz del Narrador (Guion):**
  > "Buen día profesor y compañeros. A nombre del equipo integrado por Frida, Job y Sebastian Chapa, presentamos el proyecto final para la materia de Desarrollo Web: **PARNET Ingeniería**, desarrollado en arquitectura desacoplada con React, Node.js, y programación orientada a objetos, sin utilizar PHP.
  > 
  > El objetivo primordial de esta plataforma web es suministrar un canal digital integral para la empresa PARNET, permitiendo a clientes corporativos consultar soluciones de telecomunicaciones, voz y datos, y canalizar levantamientos técnicos en sitio. Como observamos en pantalla, la cabecera respeta la paleta institucional azul marino del diseño en Photoshop, integrando un slider interactivo y la presentación de nuestras cuatro áreas core: Redes, Fibra Óptica, Telefonía IP y Redes Eléctricas con respaldo."

---

### Escena 2: Calidad en Proyectos y Consejos Técnicos (0:45 - 1:20)
- **Captura / Vista en Pantalla:** `01_home_inicio.png` (Scroll a sección Multimedia y Noticias) y `05_clientes_alianzas.png`
  - Mostrar la sección de video/audio, tableros de noticias y alianzas con Cisco/Panduit.
- **Puntos de la Rúbrica Demostrados:** 
  - *Tablero de noticias dinámico desde BD (3 pts)*
  - *Sección clientes con logos y links (3 pts)*
  - *Uso de calidad y consejos técnicos (Requisito Video)*
  - *Audio y Video tecnológico*
- **Voz del Narrador (Guion):**
  > "Uno de los pilares de PARNET Ingeniería es el **uso estricto de calidad en cada proyecto**. Cada instalación de cableado estructurado se apega a las normativas internacionales **ANSI/TIA 568-C y normativas NOM**, garantizando enlaces certificados con pruebas de reflectometría OTDR en fibra óptica.
  > 
  > Como **consejo técnico** para nuestros clientes empresariales, recomendamos siempre el uso de cableado Categoría 6 o superior con canalizaciones aisladas contra interferencias electromagnéticas, así como la instalación de sistemas ininterrumpibles UPS online de doble conversión para proteger los centros de datos contra caídas de tensión. Estas alianzas con fabricantes como Cisco, Panduit y CommScope nos permiten ofrecer hasta 15 años de vida útil en infraestructura de datos."

---

### Escena 3: Catálogo, Búsqueda y Ficha Técnica en PDF (1:20 - 1:55)
- **Captura / Vista en Pantalla:** `02_productos_catalogo.png`
  - Mostrar el buscador escribiendo "Cable", filtrar por categoría y hacer clic en "Ficha PDF".
- **Puntos de la Rúbrica Demostrados:** 
  - *Estrategia de búsqueda de productos (5 pts)*
  - *Imágenes por producto ofertado (2 pts)*
  - *Descarga de PDF con ficha técnica (5 pts)*
- **Voz del Narrador (Guion):**
  > "Pasando al módulo de catálogo público, implementamos una estrategia de búsqueda reactiva por código, nombre o descripción, complementada con filtros por categoría. Cada producto cuenta con fotografía optimizada, precio y disponibilidad de inventario en existencia o agotado.
  > 
  > Además, damos cumplimiento al requisito de generar la **Ficha Técnica oficial en formato PDF** directamente desde el servidor utilizando PDFKit bajo Programación Orientada a Objetos. Con un solo clic, el cliente descarga el documento membretado con especificaciones y certificaciones vigentes."

---

### Escena 4: Formularios Públicos Protegidos con CAPTCHA (1:55 - 2:25)
- **Captura / Vista en Pantalla:** `03_servicios_captcha.png` y `04_sugerencias_captcha.png`
  - Mostrar el formulario de servicios seleccionando un área, y el formulario de sugerencias.
- **Puntos de la Rúbrica Demostrados:** 
  - *Solicitud de servicios por área con CAPTCHA (5 pts)*
  - *Formulario de sugerencias a tabla interna con CAPTCHA (5 pts)*
  - *Formulario de contacto por email (5 pts)*
- **Voz del Narrador (Guion):**
  > "Para la interacción con los usuarios, el portal integra dos formularios críticos protegidos por **control antibot CAPTCHA** autogenerado en el servidor:
  > Primero, el formulario de Solicitud de Servicios por área técnica, que genera automáticamente un folio de seguimiento al persistirse en base de datos.
  > Y segundo, el formulario de Sugerencias para la empresa, el cual no envía correos planos sino que almacena los comentarios directamente en una tabla interna del sistema relacional para su posterior auditoría administrativa."

---

### Escena 5: Zona Privada, Dashboards BI y Mantenimiento CRUD (2:25 - 3:05)
- **Captura / Vista en Pantalla:** `06_admin_login.png`, `07_admin_dashboard_graficos.png`, `08_admin_productos_crud.png` y `09_admin_sugerencias_excel_pdf.png`
  - Mostrar el login, los 2 gráficos de Chart.js, la tabla de CRUD y los botones de Excel/PDF.
- **Puntos de la Rúbrica Demostrados:** 
  - *Autenticación administrativa privada (5 pts)*
  - *Mantenimiento CRUD de productos y stock (5 pts)*
  - *2 Dashboards con gráficos interactivos (5 pts)*
  - *Exportación de sugerencias a Excel y PDF (5 pts)*
  - *Patrón Singleton y ORM Sequelize (10 pts)*
- **Voz del Narrador (Guion):**
  > "Finalmente, accedemos a la zona privada de administración mediante autenticación protegida por tokens criptográficos JWT y contraseñas hasheadas con Bcrypt.
  > 
  > En el Panel de Control, se presentan los **dos dashboards con gráficos interactivos** construidos con Chart.js: el primero analiza el volumen de solicitudes por área de servicio, y el segundo la distribución del catálogo por categoría tecnológica.
  > 
  > En la sección de productos, el administrador dispone del CRUD completo para crear, editar, eliminar y actualizar el estatus de stock. Y en la sección de sugerencias, se ofrece visualización paginada con botones funcionales para **exportar a hojas de cálculo Excel (.xlsx)** y documentos PDF estructurados. Toda la persistencia opera mediante el ORM Sequelize bajo el patrón de diseño **Singleton**, asegurando una conexión única y eficiente a la base de datos."

---

### Escena 6: Cierre y Conclusión (3:05 - 3:15)
- **Captura / Vista en Pantalla:** `01_home_inicio.png` (Footer con contador de visitas y usuarios conectados)
- **Puntos de la Rúbrica Demostrados:** 
  - *Contador de visitas y usuarios concurrentes (2 pts)*
  - *Conclusión del video formal*
- **Voz del Narrador (Guion):**
  > "En el pie de página podemos constatar el contador en tiempo real de visitas y usuarios conectados. Con esto, PARNET Ingeniería cumple al 100% con los requerimientos técnicos y funcionales solicitados. Muchas gracias por su atención."

---

## 📂 Directorio de Capturas de Pantalla Generadas
Todas las capturas en alta resolución (1280x950) están disponibles en `docs/screenshots/`:

1. [01_home_inicio.png](screenshots/01_home_inicio.png) — Portada, Slider, Áreas y Noticias.
2. [02_productos_catalogo.png](screenshots/02_productos_catalogo.png) — Búsqueda de productos y Ficha PDF.
3. [03_servicios_captcha.png](screenshots/03_servicios_captcha.png) — Solicitud de servicios con CAPTCHA.
4. [04_sugerencias_captcha.png](screenshots/04_sugerencias_captcha.png) — Buzón de sugerencias interno con CAPTCHA.
5. [05_clientes_alianzas.png](screenshots/05_clientes_alianzas.png) — Logos y enlaces de clientes/marcas.
6. [06_admin_login.png](screenshots/06_admin_login.png) — Autenticación privada.
7. [07_admin_dashboard_graficos.png](screenshots/07_admin_dashboard_graficos.png) — Los 2 Dashboards con gráficos de Chart.js.
8. [08_admin_productos_crud.png](screenshots/08_admin_productos_crud.png) — Mantenimiento CRUD de productos y stock.
9. [09_admin_sugerencias_excel_pdf.png](screenshots/09_admin_sugerencias_excel_pdf.png) — Paginación y exportación Excel/PDF.
