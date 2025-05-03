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
