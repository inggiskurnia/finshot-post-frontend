import { JwtPayload } from "jwt-decode";

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface TokenClaims extends JwtPayload {
  userId: string;
  tokenType: string;
}

export interface LoginResponse {
  statusCode: number;
  messages: string[];
  data: TokenPair;
}
