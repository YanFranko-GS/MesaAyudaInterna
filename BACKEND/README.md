# Mesa de Ayuda Interna - Backend

Este repositorio contiene el backend para la aplicación "Mesa de Ayuda Interna", desarrollado con Spring Boot, Spring Security (JWT), y Spring Data JPA.

## Estructura del Proyecto

- `/src`: Código fuente Java y recursos.
- `/database`: Script SQL para Microsoft SQL Server / Azure SQL.
- `pom.xml`: Dependencias Maven.

## Requerimientos Técnicos Cumplidos

- **Framework**: Spring Boot 3.2.3
- **Seguridad**: JWT (JSON Web Tokens) con Spring Security.
- **Base de Datos**: Configuración lista para H2 (local) y Microsoft SQL Server (Azure).
- **Validaciones**: Título min 5 chars, Descripción min 10 chars, Transiciones de estado.
- **Roles**: 
  - `USUARIO`: Crea y ve sus propias solicitudes.
  - `OPERADOR`: Ve todas las solicitudes y cambia estados.

## Ejecución Local

### Prerrequisitos
- JDK 17 o superior.
- Maven (o usar el wrapper `mvnw`).

### Pasos
1. **Configuración de Base de Datos**:
   - Por defecto, la aplicación usa **H2 Database** en memoria para facilitar las pruebas. 
   - Se cargarán datos de prueba automáticamente desde `src/main/resources/data.sql`.
   - Para usar **SQL Server**, editar `src/main/resources/application.properties`, descomentar la sección de SQL Server y comentar la de H2.

2. **Compilar y Ejecutar**:
   ```bash
   ./mvnw spring-boot:run
   ```

3. **Acceso a la API**:
   - La aplicación corre en `http://localhost:8080`.
   - Swagger UI (si se agrega dep) o usar Postman.

## Endpoints Principales

### Autenticación
- `POST /auth/register`: Registrar nuevo usuario (Rol por defecto USUARIO).
- `POST /auth/login`: Iniciar sesión. Retorna JWT.

### Solicitudes (Requiere Header `Authorization: Bearer <token>`)
- `GET /api/solicitudes`: Listar solicitudes.
  - Usuario: Solo sus solicitudes.
  - Operador: Todas las solicitudes.
- `POST /api/solicitudes`: Crear solicitud (Solo usuarios).
- `GET /api/solicitudes/{id}`: Ver detalle.
- `PUT /api/solicitudes/{id}`: Editar solicitud.
- `GET /api/solicitudes/filter?estado=NUEVO&prioridad=ALTA`: Filtrar.

## Credenciales de Prueba (H2)
Contraseña para todos: `password`

- **Administrador / Operador**:
  - Username: `admin`
- **Usuarios**:
  - Username: `user1`
  - Username: `user2`

## Despliegue en Azure
1. Crear **Azure SQL Database** y ejecutar el script `database/script.sql`.
2. Crear **Azure App Service** (Java 17).
3. Configurar variables de entorno en Azure para la conexión a BD:
   - `SPRING_DATASOURCE_URL`
   - `SPRING_DATASOURCE_USERNAME`
   - `SPRING_DATASOURCE_PASSWORD`
4. Desplegar el JAR generado (`mvn package`).
