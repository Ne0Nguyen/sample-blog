export interface Post {
  body?: string;
  id?: number;
  title?: string;
  userId?: number;
  imageSrc?: string;
  userName?: string;
}

export interface PostComment {
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
}
