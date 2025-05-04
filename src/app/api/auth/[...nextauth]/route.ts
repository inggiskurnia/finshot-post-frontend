import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiResponse } from "@/types/response";
import { LoginResponse } from "@/types/auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

const login_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_AUTH}${process.env.NEXT_PUBLIC_LOGIN}`;
const refresh_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_AUTH}${process.env.NEXT_PUBLIC_REFRESH}`;

console.log("=== NextAuth Config Loaded ===");
console.log("login_url:", login_url);
console.log("refresh_url:", refresh_url);

declare module "next-auth" {
  interface User {
    accessToken: string;
    refreshToken: string;
    error?: string;
  }

  interface Session extends DefaultSession {
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    error?: string;
  }
}

const handler = NextAuth({
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1,
  },
  secret: process.env.PUBLIC_KEY,
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("start to authorize");
        if (!credentials) {
          return null;
        }

        const response = await axios.post<ApiResponse<LoginResponse>>(
          login_url,
          {
            email: credentials.email,
            password: credentials.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.data.success) {
          console.error("Login failed:", response.data.message);
          return null;
        }
        const loginData = response.data.data;
        console.log(loginData);

        // Verify the JWT signature
        const secret = process.env.PUBLIC_KEY;
        if (!secret) {
          console.error("JWT secret not set");
          return null;
        }
        try {
          jwt.verify(loginData.accessToken, secret, { algorithms: ["RS256"] });
          console.log("JWT verification successful");
        } catch (err) {
          console.error("JWT verification failed:", err);
          return null;
        }

        return {
          id: credentials.email,
          accessToken: loginData.accessToken,
          refreshToken: loginData.refreshToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      if (!token.accessToken || !token.refreshToken) {
        console.error("Token missing in JWT callback");
        return { ...token, error: "MissingTokenError" };
      }

      const now = Date.now();
      const decodedAccessToken = jwtDecode(token.accessToken);
      const decodedRefreshToken = jwtDecode(token.refreshToken);

      if (!decodedAccessToken.exp || !decodedRefreshToken.exp) {
        console.error("Token expiration not found");
        return token;
      }
      const accessTokenExp = new Date(decodedAccessToken.exp * 1000);
      const refreshToken = new Date(decodedRefreshToken.exp * 1000);

      if (now >= accessTokenExp.getTime()) {
        console.log("Access token expired. Refreshing...");

        if (now >= refreshToken.getTime()) {
          console.log("Refresh token expired. Logging out...");
          return { ...token, error: "RefreshTokenExpired" };
        }

        try {
          console.log("Attempting token refresh...", token.refreshToken);

          const responseRefresh = await axios.post<ApiResponse<LoginResponse>>(
            refresh_url,
            {
              refreshToken: token.refreshToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          return {
            ...token,
            accessToken: responseRefresh.data.data.accessToken,
            refreshToken: responseRefresh.data.data.refreshToken,
            error: undefined,
          };
        } catch (error) {
          console.error("Error refreshing token:", error);
          return { ...token, error: "RefreshTokenError" };
        }
      }

      console.log("Returning existing token.");
      return token;
    },

    async session({ session, token }) {
      console.log("Session callback triggered");

      if (token.error === "RefreshTokenExpired") {
        console.log("Session expired. Logging out user.");
        session.error = "RefreshTokenExpired";
        return session;
      }

      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        error: token.error,
      };
    },
  },
});

export { handler as GET, handler as POST };
