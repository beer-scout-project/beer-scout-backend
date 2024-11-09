export interface User {
  id: number; // Unique identifier for the user
  username: string; // User's display name
  email: string; // User's email for login
  password: string; // User's hashed password (hashing recommended for security)
  role: "user" | "admin" | "owner"; // Role of the user, restricted to specific roles
  created_at: Date; // Timestamp of account creation
}
