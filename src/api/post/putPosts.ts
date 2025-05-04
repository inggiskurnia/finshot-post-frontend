import axios from "axios";
import { getSession } from "next-auth/react";

const postsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_POSTS}`;

export const updateViews = async (slug: string) => {
  const session = await getSession();
  const accessToken = session?.accessToken;
  if (!accessToken) throw new Error("No access token");

  const response = await axios.put(`${postsUrl}/views/${slug}`, null, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};
