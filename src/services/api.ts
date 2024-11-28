import axios from "axios";

const api = axios.create({
  baseURL: "https://gorest.co.in/public/v2",
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getPosts = async ({
  page,
  search = "",
  searchBy = "title",
}: GetPostsParams) => {
  const params = new URLSearchParams({
    page: page.toString(),
  });

  if (search) {
    params.append(searchBy, search);
  }

  const response = await api.get(`/posts?per_page=12&${params.toString()}`);
  return response.data;
};

export const createPost = async (data: any) => {
  const response = await api.post("/posts", data);
  return response.data;
};

export const getComments = async ({ postId }: GetCommentsParams) => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};
export const getUsers = async ({ userId }: GetUserDetailsParams) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const addPost = async ({ title, body, userId }: AddPostParams) => {
  const response = await api.post(`/users/${userId}/posts`, {
    title,
    body,
    userId,
  });
  return response.data;
};

export const editPost = async ({ title, body, postId }: EditPostParams) => {
  const response = await api.patch(`/posts/${postId}`, {
    title,
    body,
    postId,
  });
  return response.data;
};

export const deletePost = async (postId: number) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};

export const deleteUsers = async (userId: number) => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};

export const addUser = async ({
  name,
  email,
  gender,
  status = "active",
}: AddUserParams) => {
  const response = await api.post(`/users`, {
    name,
    email,
    gender,
    status,
  });
  return response.data;
};
