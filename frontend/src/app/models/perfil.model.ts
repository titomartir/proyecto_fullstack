export interface Perfil {
  id?: number;
  usuario_id?: number;
  nombre: string;
  apellido: string;
  edad: number;
  correo: string;
  telefono: string;
  created_at?: Date;
  updated_at?: Date;
}
