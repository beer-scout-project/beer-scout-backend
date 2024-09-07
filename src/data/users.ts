import { getSql } from './db';

// Data function to find a user by email and password
export const findUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  const sql = await getSql();

  const result = await sql`
      SELECT * FROM users WHERE email = ${email} AND password = ${password}
    `;

  return result[0]; // Return the first user found with matching email and password
};

// Data function to find a user by email
export const findUserByEmail = async (email: string) => {
  const sql = await getSql();

  const result = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

  return result[0]; // Return the first user found with matching email
};

// Data function to find a user by username
export const findUserByUsername = async (username: string) => {
  const sql = await getSql();

  const result = await sql`SELECT * FROM users WHERE username = ${username}`;

  return result[0]; // Return the first user found with matching username
};

// Data function to insert a new user
export const insertUser = async (
  email: string,
  password: string,
  username: string
) => {
  const sql = await getSql();

  const result = await sql`
    INSERT INTO users (email, password, username)
    VALUES (${email}, ${password}, ${username})
    RETURNING *`;

  return result[0]; // Return the newly created user
};
