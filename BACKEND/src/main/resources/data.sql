-- Passwords are 'password' (BCrypt encoded)
INSERT INTO usuarios (email, password, nombre, rol) VALUES ('admin@test.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Admin', 'OPERADOR');
INSERT INTO usuarios (email, password, nombre, rol) VALUES ('juan@test.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Juan', 'USUARIO');
INSERT INTO usuarios (email, password, nombre, rol) VALUES ('maria@test.com', '$2a$10$dXJ3SW6G7P50lGmMkkmwe.20cQQubK3.HZWzG3YB1tlRy.fqvM/BG', 'Maria', 'USUARIO');

INSERT INTO solicitudes (titulo, descripcion, prioridad, estado, usuario_id, fecha_creacion, fecha_actualizacion) VALUES ('Problema con correo', 'No puedo recibir correos externos desde ayer.', 'ALTA', 'NUEVO', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO solicitudes (titulo, descripcion, prioridad, estado, usuario_id, fecha_creacion, fecha_actualizacion) VALUES ('Pantalla azul', 'Mi laptop muestra pantalla azul al iniciar.', 'ALTA', 'EN_PROCESO', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO solicitudes (titulo, descripcion, prioridad, estado, usuario_id, fecha_creacion, fecha_actualizacion) VALUES ('Solicitud de acceso', 'Necesito acceso a la carpeta compartida de Finanzas.', 'MEDIA', 'NUEVO', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO solicitudes (titulo, descripcion, prioridad, estado, usuario_id, fecha_creacion, fecha_actualizacion) VALUES ('Impresora sin toner', 'La impresora del piso 2 necesita toner negro.', 'BAJA', 'RESUELTO', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO solicitudes (titulo, descripcion, prioridad, estado, usuario_id, fecha_creacion, fecha_actualizacion) VALUES ('VPN no conecta', 'Error 800 al intentar conectar a la VPN.', 'ALTA', 'NUEVO', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
