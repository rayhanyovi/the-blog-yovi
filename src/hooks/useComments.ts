import { getComments } from "@/services/api";
import { useQuery } from "react-query";

interface UseCommentsParams {
  postId: number;
  enabled: boolean;
}

export const useComments = ({ postId, enabled = true }: UseCommentsParams) => {
  return useQuery(["comments", postId], () => getComments({ postId }), {
    keepPreviousData: true,
    enabled,
  });
};
