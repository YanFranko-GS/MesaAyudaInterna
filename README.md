# Sistema de Mesa de Ayuda - SoporteApp

Este proyecto es una solución integral para la gestión de solicitudes de soporte técnico, desarrollada como parte de una evaluación técnica.

## 🚀 Tecnologías Utilizadas

### Frontend (Angular 21+)
- **Detección de Cambios Zoneless**: Implementación moderna sin `Zone.js` para mayor rendimiento.
- **Angular Material / CSS Variables**: Diseño premium con soporte para Dark Mode.
- **Reactive Forms**: Validaciones robustas en tiempo real.
- **JWT Auth**: Seguridad basada en tokens con interceptores.

### Backend (Spring Boot 3+)
- **Spring Security**: Autenticación y autorización basada en roles (USUARIO, OPERADOR).
- **JPA / Hibernate**: Persistencia de datos eficiente.
- **REST API**: Endpoints CRUD y filtros avanzados de búsqueda.

### Base de Datos
- **SQL Server / Azure SQL**: Modelo de datos relacional para solicitudes y usuarios.

---

## 🛠️ Instalación y Ejecución Local

### Requisitos Previos
- Node.js (v18+)
- Java JDK 17+
- SQL Server (Local o Azure)

### 1. Base de Datos
1. Ejecute el script SQL ubicado en `/database/baseDatos.sql` para crear las tablas e insertar los datos iniciales.

### 2. Backend (SoporteApp8989)
1. Configure las credenciales de su base de datos en `src/main/resources/application.properties`.
2. Ejecute `./mvnw spring-boot:run` (o use su IDE).
3. El API estará disponible en `http://localhost:8082`.

### 3. Frontend (FRONDTEN/AyudaInterna)
1. Navegue a la carpeta: `cd FRONDTEN/AyudaInterna`.
2. Instale las dependencias: `npm install`.
3. Inicie el servidor de desarrollo: `npm start`.
4. Acceda a `http://localhost:4200`.

---

## ☁️ Despliegue en Azure

### Frontend (Azure Static Web Apps)
- Se recomienda usar la CLI de Azure o el portal para vincular el repositorio Git.
- El comando de construcción es `npm run build`.

### Backend (Azure App Service)
- Desplegar como código Java 17.
- Configurar las variables de entorno para la conexión a la base de Datos en la sección "Configuration".

### Database (Azure SQL)
- Crear una instancia de Azure SQL y habilitar el acceso a los servicios de Azure.

---

## ⚖️ Preguntas de Análisis

### 1. ¿Qué validaciones harías en front y cuáles en back?
- **Front-end**: Validaciones de formato (email, longitud de campos), campos obligatorios y feedback inmediato al usuario para mejorar la UX.
- **Back-end**: Validaciones de integridad de datos, reglas de negocio (ej. un usuario no puede cerrar una solicitud de otro), seguridad (roles) y tipos de datos correctos antes de persistir.

### 2. ¿Qué harías si la lista crece a miles de registros?
Implementaría **Paginación** en el backend para no saturar la memoria del navegador. También añadiría índices en la base de datos por columnas de búsqueda frecuente como `estado` y `fecha_creacion`.

### 3. ¿Qué riesgos hay al dejar credenciales en el código?
- Exposición de datos sensibles en el repositorio Git.
- Facilidad para ataques por fuerza bruta o acceso no autorizado a la infraestructura.
- Dificultad para rotar contraseñas sin redesplegar el código.
- **Solución**: Usar Variables de Entorno o Azure Key Vault.

### 4. ¿Qué mejora técnica aplicarías en una segunda versión?
- Implementar **WebSockets** para notificaciones en tiempo real cuando cambia el estado de una solicitud.
- Añadir **Unit Testing** con mayor cobertura tanto en Java como en Angular.
- Usar un sistema de cache (Redis) para estados de solicitudes frecuentes.
