import { LoginData } from './loginData';

export interface LoginResponse {
  data: LoginData,
  errCode: number,
  message: string
}
