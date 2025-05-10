import axios from "axios";
import { LoginForm, LoginResponse } from "@/types/auth";
import { ApiResponse } from "@/types/response";
import { getSession } from "next-auth/react";

const authUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_AUTH}`;

export const logoutUser = async (): Promise<ApiResponse<LoginResponse>> => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  const refreshToken = session?.refreshToken;

  if (!accessToken) throw new Error("No access token");

  const response = await axios.post<ApiResponse<LoginResponse>>(
    `${authUrl}/logout`,
    {
      refreshToken: refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  return response.data;
};

export interface Credentials {
  email: string;
  password: string;
}

export const loginUser = async ({
  email,
  password,
}: Credentials): Promise<ApiResponse<LoginResponse>> => {
  const response = await axios.post<ApiResponse<LoginResponse>>(
    `${authUrl}/login`,
    {
      email,
      password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};
