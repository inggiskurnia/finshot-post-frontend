import axios from "axios";
import { LoginForm, LoginResponse } from "@/types/auth";
import { ApiResponse } from "@/types/response";

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
