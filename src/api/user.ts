import { RegisterResponse, RegisterUser } from "@/types/user";
import { ApiResponse } from "@/types/response";
import axios from "axios";

const userUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_USERS}`;

export const registerUser = async (
  body: RegisterUser,
): Promise<ApiResponse<RegisterResponse>> => {
  const response = await axios.post<ApiResponse<RegisterResponse>>(
    `${userUrl}/register`,
    body,
  );

  return response.data;
};
