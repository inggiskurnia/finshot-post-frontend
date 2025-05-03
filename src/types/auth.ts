import { User } from "@/types/user";

export interface LoginForm {
  email: string;
  password: string;
}

export interface LoginResponse {
  email: string;
  accessToken: string;
  refreshToken: string;
}
