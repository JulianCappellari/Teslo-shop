export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  emailVerificado?: Date  | null;
  password: string;
  rol: string;
  imagen?: string | null;
}
