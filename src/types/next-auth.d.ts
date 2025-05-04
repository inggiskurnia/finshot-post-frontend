import "next-auth";
import { DefaultSession } from "next-auth";
import { TokenClaims } from "@/types/token-pair";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    error?: string;
    user: {
      email: string;
    } & DefaultSession["user"];
  }

  interface UserTokenDetails {
    accessToken: {
      claims: TokenClaims;
      value: string;
    };
    refreshToken: {
      claims: TokenClaims;
      value: string;
    };
  }

  interface User {
    token: UserTokenDetails;
    userId: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken: {
      claims: TokenClaims;
      value: string;
    };
    refreshToken: {
      claims: TokenClaims;
      value: string;
    };
    userId: number;
    error?: string;
  }
}
