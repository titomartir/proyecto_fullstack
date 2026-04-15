import { Perfil } from './perfil.model';

export interface Usuario {
  id?: number;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  usuario: Usuario;
  perfil?: Perfil;
}
