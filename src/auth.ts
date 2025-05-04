import NextAuth, { User, Session, Account, Profile } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import { LoginResponse, TokenClaims } from "@/types/token-pair";
import { AdapterUser } from "next-auth/adapters";

interface Token {
  accessToken: {
    claims: TokenClaims;
    value: string;
  };
  refreshToken: {
    claims: TokenClaims;
    value: string;
  };
  userId: number;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
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
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ): Promise<User | null> {
        if (!credentials) {
          return null;
        }
        const { email, password } = credentials;

        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/login`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          return null;
        }

        const { data } = (await response.json()) as LoginResponse;

        const secret = process.env.JWT_SECRET;
        if (!secret) {
          console.error("JWT secret not set");
          return null;
        }

        try {
          jwt.verify(data.accessToken, secret);
        } catch (err) {
          console.error("JWT verification failed:", err);
          return null;
        }

        const decodedToken = jwtDecode<TokenClaims>(data.accessToken);

        const { sub, userId } = decodedToken;

        if (!sub) {
          console.error("JWT 'sub' claim is missing");
          return null;
        }

        const parsedResponse: User = {
          id: sub,
          token: {
            accessToken: {
              claims: decodedToken,
              value: data.accessToken,
            },
            refreshToken: {
              claims: jwtDecode<TokenClaims>(data.refreshToken),
              value: data.refreshToken,
            },
          },
          userId: parseInt(userId),
        };

        return parsedResponse ?? null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      const customToken = token as unknown as Token;
      session.accessToken = customToken.accessToken.value;
      session.refreshToken = customToken.refreshToken.value;
      session.user = {
        ...session.user,
      };
      return session;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User | AdapterUser;
      account?: Account | null;
      profile?: Profile;
      trigger?: "signIn" | "signUp" | "update";
    }): Promise<JWT> {
      if (account && user) {
        const initialUser = user as User;

        if (!initialUser.token || !initialUser.userId) {
          console.error(
            "Initial user object missing required properties (token, userId)",
          );
          token.error = "InitialAuthError";
          return token;
        }
        token.accessToken = initialUser.token.accessToken;
        token.refreshToken = initialUser.token.refreshToken;
        token.userId = initialUser.userId;
        token.error = undefined;
        token.sub = initialUser.id;

        return token;
      }

      if (
        token.accessToken?.claims?.exp &&
        Date.now() >= token.accessToken.claims.exp * 1000
      ) {
        console.log("Access token expired, attempting refresh...");
        try {
          if (!token.refreshToken?.value) {
            console.error("No refresh token available for refresh attempt.");
            token.error = "MissingRefreshToken";
            return token;
          }

          const newAccessTokenDetails = await refreshToken(
            token.refreshToken.value,
          );

          if (newAccessTokenDetails) {
            console.log("Token refresh successful.");
            token.accessToken = newAccessTokenDetails;
            token.error = undefined;
          } else {
            console.error(
              "Token refresh failed (refreshToken function returned null).",
            );
            token.error = "RefreshAccessTokenError";
          }
        } catch (error) {
          console.error("Error refreshing access token:", error);
          token.error = "RefreshAccessTokenError";
        }
      }

      return token;
    },

    async signIn({ user }: { user: User }) {
      console.log("IN SIGNIN CALLBACK: ", user);
      return true;
    },
  },
});

const refreshToken = async (refreshToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/refresh`;
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify({ token: refreshToken }),
  });
  if (!response.ok) {
    console.error("Failed to refresh access token");
    return null;
  }
  const { data } = (await response.json()) as LoginResponse;

  const secret = process.env.PUBLIC_KEY;
  if (!secret) {
    console.error("JWT secret not set");
    return null;
  }

  try {
    jwt.verify(data.accessToken, secret);
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }

  const decodedToken = jwtDecode<TokenClaims>(data.accessToken);

  return {
    claims: decodedToken,
    value: data.accessToken,
  };
};
