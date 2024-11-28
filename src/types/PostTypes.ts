interface GetPostsParams {
  page: number;
  search?: string;
  searchBy?: "title" | "body";
}

interface GetCommentsParams {
  postId: number;
}

interface AddPostParams {
  title: string;
  body: string;
  userId: number;
}
interface EditPostParams {
  title: string;
  body: string;
  postId: number;
}
