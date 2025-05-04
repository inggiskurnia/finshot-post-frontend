import axios from "axios";
import { getSession } from "next-auth/react";

const postsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_POSTS}`;

export const deletePostBySlug = async (slug: string) => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("No access token");

  const response = await axios.delete(`${postsUrl}/${slug}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
