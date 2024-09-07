import {
  findUserByEmailAndPassword,
  findUserByEmail,
  findUserByUsername,
  insertUser,
} from '../data/users';

// api function to get user by email and password
export const getUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  //call the data function to get user by email and password
  return await findUserByEmailAndPassword(email, password);
};

// api function to check if email exists
export const checkEmailExists = async (email: string) => {
  //call the data function look for user by email
  const user = await findUserByEmail(email);
  //return true if user exists nothing if not (which will trigger signup to continue)
  return !!user;
};

// api function to check if username exists
export const checkUsernameExists = async (username: string) => {
  //call the data function look for user by username
  const user = await findUserByUsername(username);
  //return true if user exists nothing if not (which will trigger signup to continue)
  return !!user;
};

// api function to create a user
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  //call the data function to insert a new user
  return await insertUser(email, password, username);
};
