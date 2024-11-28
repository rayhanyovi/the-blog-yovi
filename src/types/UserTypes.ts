interface GetUserDetailsParams {
  userId: number;
}

interface AddUserParams {
  name: string;
  status: "active" | "inactive";
  gender: "male" | "female";
  email: string;
}
