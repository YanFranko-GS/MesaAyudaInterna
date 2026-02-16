export enum Rol {
  USUARIO = 'USUARIO',
  OPERADOR = 'OPERADOR'
}

export enum Estado {
  NUEVO = 'NUEVO',
  EN_PROCESO = 'EN_PROCESO',
  RESUELTO = 'RESUELTO',
  CERRADO = 'CERRADO'
}

export enum Prioridad {
  ALTA = 'ALTA',
  MEDIA = 'MEDIA',
  BAJA = 'BAJA'
}

export interface AuthResponse {
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  email: string;
  password: string;
  rol?: Rol;
}

export interface UsuarioDto {
  id: number;
  email: string;
  nombre: string;
  rol: Rol;
}

export interface SolicitudDto {
  id?: number;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  estado: Estado;
  fechaCreacion?: string;
  fechaActualizacion?: string; 
  solicitanteUsername?: string;
  solicitanteId?: number;
}
