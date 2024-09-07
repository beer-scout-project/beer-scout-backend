import { Context } from 'hono';
import {
  getUserByEmailAndPassword,
  checkEmailExists,
  checkUsernameExists,
  createUser,
} from '../api/users';

//handler for user login (email and password)
export const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();

    //check if user with matching email and password in database
    const user = await getUserByEmailAndPassword(email, password);

    //if user exists, return user object if not return error message
    if (user) {
      return c.json({ user, message: 'Login successful' }, 200);
    } else {
      return c.json({ error: 'Invalid email or password' }, 400);
    }
  } catch (error) {
    return c.json({ error: 'Failed to login' }, 500);
  }
};

//handler for user signup (email, password, and username)
export const signupUser = async (c: Context) => {
  try {
    const { email, password, username } = await c.req.json();

    // Check if the email or username already exists in database
    const emailExists = await checkEmailExists(email);
    const usernameExists = await checkUsernameExists(username);

    if (emailExists) {
      return c.json({ error: 'Email already exists' }, 409);
    }

    if (usernameExists) {
      return c.json({ error: 'Username already exists' }, 409);
    }

    // Proceed with user creation if no conflict
    const newUser = await createUser(email, password, username);

    return c.json({ user: newUser, message: 'Signup successful' }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to signup' }, 500);
  }
};

//handler for user logout
export const logoutUser = async (c: Context) => {
  try {
    //logout logic (to be implemented with sessions)
    return c.json({ message: 'Logout successful' }, 200);
  } catch (error) {
    return c.json({ error: 'Failed to logout' }, 500);
  }
};
