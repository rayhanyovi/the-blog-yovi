import { useMutation, useQuery, useQueryClient } from "react-query";
import { addPost, getPosts, editPost, deletePost } from "../services/api";

interface UsePostsParams {
  page: number;
  search?: string;
  searchBy?: "title" | "body";
}

export const usePosts = ({
  page,
  search = "",
  searchBy = "title",
}: UsePostsParams) => {
  const queryClient = useQueryClient();
  const queryKey = search ? ["posts", page, search, searchBy] : ["posts", page];

  const postsQuery = useQuery(
    queryKey,
    () => getPosts({ page, search, searchBy }),
    {
      keepPreviousData: true,
    }
  );

  const addPostMutation = useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const editPostMutation = useMutation(editPost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  const deletePostMutation = useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
    },
  });

  return {
    ...postsQuery,
    addPost: addPostMutation.mutateAsync,
    editPost: editPostMutation.mutateAsync,
    deletePost: deletePostMutation.mutateAsync,
  };
};
