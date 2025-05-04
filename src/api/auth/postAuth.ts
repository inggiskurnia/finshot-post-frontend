import axios from "axios";
import { LoginForm, LoginResponse } from "@/types/auth";
import { ApiResponse } from "@/types/response";
import { getSession } from "next-auth/react";

const authUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_AUTH}`;

export const loginUser = async (
  body: LoginForm,
): Promise<ApiResponse<LoginResponse>> => {
  const response = await axios.post<ApiResponse<LoginResponse>>(
    `${authUrl}/login`,
    body,
  );

  return response.data;
};

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
