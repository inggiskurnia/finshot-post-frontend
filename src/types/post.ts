export interface Post {
  postId: number;
  userName: string;
  userProfilePictureUrl?: string;
  title: string;
  body: string;
  createdAt: string;
  totalViews: number;
}
