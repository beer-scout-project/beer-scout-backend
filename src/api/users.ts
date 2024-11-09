import { findUserByEmailAndPassword, findUserById } from "../data/users";

// API function to get user by email and password (for login)
export const getUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await findUserByEmailAndPassword(email, password);
};

// API function to get user by ID (for session verification)
export const getUserById = async (id: string) => {
  return await findUserById(id);
};
