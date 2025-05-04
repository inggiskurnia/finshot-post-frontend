import axios from "axios";
import { PostForm, PostResponse } from "@/types/post";
import { ApiResponse } from "@/types/response";
import { getSession } from "next-auth/react";

const postsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_POSTS}`;

export const createNewPost = async (
  requestForm: PostForm,
): Promise<ApiResponse<PostResponse>> => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("No access token");

  const response = await axios.post<ApiResponse<PostResponse>>(
    postsUrl,
    requestForm,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};

export const updatePost = async (
  slug: string,
  requestForm: PostForm,
): Promise<ApiResponse<PostResponse>> => {
  const session = await getSession();
  const accessToken = session?.accessToken;

  if (!accessToken) throw new Error("No access token");

  const response = await axios.put<ApiResponse<PostResponse>>(
    `${postsUrl}/${slug}`,
    requestForm,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response.data;
};
