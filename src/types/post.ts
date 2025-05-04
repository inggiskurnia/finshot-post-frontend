export interface Post {
  postId: number;
  author: string;
  userProfilePictureUrl?: string;
  title: string;
  body: string;
  totalViews: number;
  createdAt: string;
  updatedAt?: string;
}

export interface PostForm {
  title: string;
  body: string;
}

export interface PostResponse {
  postId: number;
  title: string;
  body: string;
  totalViews: number;
  author: string;
  createdAt: string;
  updatedAt: string;
}
