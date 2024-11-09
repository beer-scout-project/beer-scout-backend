import { getSql } from "./db";

// Data function to find a user by email and password (for login)
export const findUserByEmailAndPassword = async (
  email: string,
  password: string
) => {
  const sql = await getSql();
  console.log("Querying user by email and password...");

  const result = await sql`
    SELECT * FROM users WHERE email = ${email} AND password = ${password}
  `;
  console.log("Query result:", result);

  return result[0]; // Return the first user found with matching email and password
};

// Data function to get a user by ID (for session verification)
export const findUserById = async (id: string) => {
  const sql = await getSql();
  const result = await sql`
    SELECT * FROM users WHERE id = ${id}
  `;
  return result[0]; // Return the first user with that ID
};
