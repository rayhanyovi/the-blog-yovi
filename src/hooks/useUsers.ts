import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUsers, deleteUsers } from "../services/api";

interface UseUsersParams {
  userId: number;
  enabled?: boolean;
}

export const useUsers = ({ userId, enabled = true }: UseUsersParams) => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery(["users", userId], () => getUsers({ userId }), {
    keepPreviousData: true,
    enabled,
  });

  const deleteUserMutation = useMutation(deleteUsers, {
    onSuccess: () => {
      queryClient.invalidateQueries("users");
    },
  });

  return {
    ...usersQuery,
    deleteUser: deleteUserMutation.mutateAsync,
  };
};
