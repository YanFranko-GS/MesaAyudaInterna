-- CRATE TABLES (DDL)

CREATE TABLE usuarios (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
    rol VARCHAR(50)
);

CREATE TABLE solicitudes (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion VARCHAR(1000) NOT NULL,
    prioridad VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    usuario_id BIGINT NOT NULL,
    fecha_creacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion DATETIME2 DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_Solicitud_Usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

-- INSERTS (DML)
-- Passwords are 'password'
INSERT INTO usuarios (username, password, nombre, apellido, rol) VALUES 
('admin', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Admin', 'User', 'OPERADOR'),
('user1', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Juan', 'Perez', 'USUARIO'),
('user2', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Maria', 'Gomez', 'USUARIO');

INSERT INTO solicitudes (titulo, descripcion, prioridad, estado, usuario_id, fecha_creacion, fecha_actualizacion) VALUES
('Problema con correo', 'No puedo recibir correos externos desde ayer.', 'ALTA', 'NUEVO', 2, SYSDATETIME(), SYSDATETIME()),
('Pantalla azul', 'Mi laptop muestra pantalla azul al iniciar.', 'ALTA', 'EN_PROCESO', 2, SYSDATETIME(), SYSDATETIME()),
('Solicitud de acceso', 'Necesito acceso a la carpeta compartida de Finanzas.', 'MEDIA', 'NUEVO', 3, SYSDATETIME(), SYSDATETIME()),
('Impresora sin toner', 'La impresora del piso 2 necesita toner negro.', 'BAJA', 'RESUELTO', 3, SYSDATETIME(), SYSDATETIME()),
('VPN no conecta', 'Error 800 al intentar conectar a la VPN.', 'ALTA', 'NUEVO', 2, SYSDATETIME(), SYSDATETIME()),
('Instalar Office', 'Requiero licencia de Office 365.', 'MEDIA', 'CERRADO', 3, SYSDATETIME(), SYSDATETIME()),
('Mouse dañado', 'El click derecho no funciona.', 'BAJA', 'NUEVO', 2, SYSDATETIME(), SYSDATETIME()),
('Teclado pegado', 'La tecla Enter se queda pegada.', 'BAJA', 'RESUELTO', 3, SYSDATETIME(), SYSDATETIME()),
('Monitor parpadea', 'El monitor secundario se apaga a veces.', 'MEDIA', 'EN_PROCESO', 2, SYSDATETIME(), SYSDATETIME()),
('Clave bloqueada', 'Olvide mi clave de SAP.', 'ALTA', 'NUEVO', 3, SYSDATETIME(), SYSDATETIME());
