import axios from "axios";

const postsUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_POSTS}`;

export const updateViews = async () => {
  const response = await axios.put(`${postsUrl}/views`);
  return response.data;
};
