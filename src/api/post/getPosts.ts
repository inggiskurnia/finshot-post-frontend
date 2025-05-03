import axios from "axios";
import { PaginatedRequestParams, PaginationResponse } from "@/types/pagination";
import { ApiResponse } from "@/types/response";
import { Post } from "@/types/post";

const postsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_POSTS}`;

export const getPaginatedAllPost = async ({
  page,
  limit,
}: PaginatedRequestParams): Promise<ApiResponse<PaginationResponse<Post>>> => {
  const response = await axios.get<ApiResponse<PaginationResponse<Post>>>(
    `${postsUrl}/paginated`,
    {
      params: { page, limit },
    },
  );

  return response.data;
};

export const getPostBySlug = async (
  slug: string,
): Promise<ApiResponse<Post>> => {
  const response = await axios.get<ApiResponse<Post>>(`${postsUrl}/${slug}`);
  return response.data;
};
