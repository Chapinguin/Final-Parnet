# Contrato de API REST — Parnet Ingeniería

Este documento define la especificación técnica de la API REST del backend para que **Frida** (Frontend Público) y **Job** (Panel Admin) puedan consumir o mockear las rutas sin depender del estado de avance del backend.

- **URL Base:** `http://localhost:4000/api`
- **Formato de Comunicación:** JSON (`Content-Type: application/json`), salvo descargas de archivos (`application/pdf`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`).
- **Autenticación:** Cabecera `Authorization: Bearer <TOKEN_JWT>` para rutas protegidas.

---

## 1. Módulo de Autenticación (`/api/auth`)

### `POST /api/auth/login`
- **Descripción:** Inicio de sesión para administradores.
- **Body:**
  ```json
  {
    "username": "admin",
    "password": "Password123!"
  }
  ```
- **Respuesta Exitosa (200 OK):**
  ```json
  {
    "success": true,
    "token": "eyJhbGciOiJIUzI1NiIsIn...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@parnet.com.mx",
      "rol": "ADMIN"
    }
  }
  ```

### `GET /api/auth/verify` *(Protegido)*
- **Descripción:** Valida la vigencia de la sesión activa.
- **Respuesta (200 OK):**
  ```json
  {
    "valid": true,
    "user": { "username": "admin", "rol": "ADMIN" }
  }
  ```

---

## 2. Módulo de CAPTCHA (`/api/captcha`)

### `GET /api/captcha`
- **Descripción:** Genera un SVG matemático o alfanumérico para validación antibot.
- **Respuesta (200 OK):**
  ```json
  {
    "captchaId": "c8f2a9d1-39b0-4f5a-a309-8d123e456789",
    "svg": "<svg xmlns='http://www.w3.org/2000/svg' width='150' height='50'>...</svg>"
  }
  ```

---

## 3. Módulo de Catálogo y Fichas Técnicas (`/api/productos`)

### `GET /api/productos`
- **Descripción:** Listado público de productos con soporte para búsqueda y filtrado.
- **Query Params:**
  - `search` (opcional): Filtro por texto en nombre o descripción.
  - `categoria` (opcional): Filtro por categoría tecnológica.
  - `estatus` (opcional): `Existencia` o `Agotado`.
- **Respuesta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "codigo": "CAB-UTP-CAT6",
      "nombre": "Cable UTP Categoría 6 Bobina 305m",
      "categoria": "Cableado Estructurado",
      "descripcion": "Cable de cobre de alta velocidad para redes de datos Gigabit Ethernet.",
      "especificaciones": "Calibre 23 AWG, 4 pares trenzados, chaqueta PVC azul, estándar TIA/EIA 568-C.2.",
      "precio": 2450.00,
      "imagen_url": "/uploads/productos/cable-utp-cat6.jpg",
      "estatus": "Existencia"
    }
  ]
  ```

### `GET /api/productos/:id/ficha-pdf`
- **Descripción:** Descarga de la Ficha Técnica oficial en formato PDF.
- **Headers de Respuesta:**
  - `Content-Type: application/pdf`
  - `Content-Disposition: attachment; filename="FichaTecnica_<codigo>.pdf"`

### `POST /api/productos` *(Protegido)*
- **Descripción:** Registro de un nuevo producto (Admin).
- **Body:** `{ codigo, nombre, categoria, descripcion, especificaciones, precio, imagen_url, estatus }`

### `PUT /api/productos/:id` *(Protegido)*
- **Descripción:** Actualización completa de datos o estatus del producto.

### `DELETE /api/productos/:id` *(Protegido)*
- **Descripción:** Eliminación lógica o física del producto del inventario.

---

## 4. Módulo de Solicitud de Servicios (`/api/servicios`)

### `POST /api/servicios`
- **Descripción:** Envío del formulario público de solicitud de servicios por áreas.
- **Body:**
  ```json
  {
    "cliente_nombre": "Carlos Mendoza",
    "email": "carlos@empresa.com",
    "telefono": "844-123-4567",
    "empresa": "Industrias del Norte",
    "area": "Redes y Telecomunicaciones",
    "detalle": "Requerimos levantamiento técnico para enlace de fibra óptica en planta nueva.",
    "captcha": "a4x9",
    "captchaId": "c8f2a9d1-39b0-4f5a-a309-8d123e456789"
  }
  ```
- **Respuesta (201 Created):**
  ```json
  {
    "success": true,
    "mensaje": "Solicitud registrada con éxito. Un ingeniero se pondrá en contacto.",
    "folio": "SRV-2026-0042"
  }
  ```

---

## 5. Módulo de Sugerencias Internas (`/api/sugerencias`)

### `POST /api/sugerencias`
- **Descripción:** Envío de sugerencia para la empresa (almacenada en base de datos interna).
- **Body:**
  ```json
  {
    "nombre": "Ana Morales",
    "email": "ana@correo.com",
    "mensaje": "Excelente catálogo, sugerimos incluir mayor variedad de switches administrables.",
    "captcha": "7kz2",
    "captchaId": "e1f2b3c4-1122-3344-5566-778899aabbcc"
  }
  ```

### `GET /api/sugerencias` *(Protegido)*
- **Descripción:** Consulta administrativa paginada de sugerencias.
- **Query Params:** `page=1&limit=10`
- **Respuesta (200 OK):**
  ```json
  {
    "total": 45,
    "page": 1,
    "totalPages": 5,
    "data": [
      {
        "id": 1,
        "nombre": "Ana Morales",
        "email": "ana@correo.com",
        "mensaje": "Excelente catálogo...",
        "fecha": "2026-11-21T18:30:00.000Z"
      }
    ]
  }
  ```

### `GET /api/sugerencias/export/excel` *(Protegido)*
- **Headers:** `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`

### `GET /api/sugerencias/export/pdf` *(Protegido)*
- **Headers:** `Content-Type: application/pdf`

---

## 6. Módulo de Noticias Dinámicas (`/api/noticias`)

### `GET /api/noticias`
- **Descripción:** Tablero público de noticias activas.
- **Respuesta (200 OK):**
  ```json
  [
    {
      "id": 1,
      "titulo": "Ampliación de cobertura de Fibra Óptica 2026",
      "contenido": "Parnet Ingeniería expande su infraestructura de enlaces dedicados...",
      "fecha": "2026-11-15",
      "imagen_url": "/uploads/noticias/fibra.jpg"
    }
  ]
  ```

---

## 7. Módulo de Analítica y Dashboards (`/api/analytics`)

### `GET /api/analytics/visitas`
- **Descripción:** Registra una vista de página y devuelve el total histórico de visitas y las sesiones con latido en los últimos dos minutos.
- **Query Params:** `ruta` (opcional): ruta pública que se está visitando.
- **Respuesta (200 OK):**
  ```json
  {
    "totalVisitas": 1528,
    "usuariosConectados": 14
  }
  ```

### `POST /api/analytics/presencia`
- **Descripción:** Registra o renueva el latido de una sesión de navegador y elimina las sesiones vencidas. Una sesión se considera conectada durante dos minutos desde su último latido.
- **Body:** `{ "sessionId": "UUID generado por el navegador", "ruta": "/productos" }`
- **Respuesta (200 OK):** `{ "usuariosConectados": 3 }`

### `GET /api/analytics/dashboards` *(Protegido)*
- **Descripción:** Métricas preprocesadas para renderizar los 2 gráficos de Chart.js en el panel administrativo.
- **Respuesta (200 OK):**
  ```json
  {
    "dashboardServicios": [
      { "area": "Redes y Telecomunicaciones", "total": 24 },
      { "area": "Cableado Estructurado", "total": 18 },
      { "area": "Fibra Óptica", "total": 15 },
      { "area": "Telefonía IP", "total": 9 }
    ],
    "dashboardProductos": [
      { "categoria": "Cableado", "total": 12 },
      { "categoria": "Conectividad & Racks", "total": 8 },
      { "categoria": "Fibra Óptica", "total": 14 },
      { "categoria": "Telefonía", "total": 6 }
    ],
    "resumenStock": {
      "totalProductos": 40,
      "enExistencia": 34,
      "agotados": 6
    }
  }
  ```

## 8. Contacto por correo (`/api/contacto`)

### `POST /api/contacto`
- **Descripción:** Valida y envía el mensaje al correo corporativo a través de Resend. El correo del visitante se establece como dirección de respuesta.
- **Body:** `{ "nombre": "Ana López", "email": "ana@empresa.com", "telefono": "8441234567", "asunto": "Cotización", "mensaje": "Solicito información..." }`
- **Respuesta:** `202 Accepted` cuando el proveedor acepta el correo; `503` cuando faltan credenciales y `502` ante un rechazo o error del proveedor.
- **Configuración:** `RESEND_API_KEY`, `CONTACT_EMAIL_FROM` (dominio verificado en Resend) y `CONTACT_EMAIL_TO` en `backend/.env`.

