export interface User {
  id: number; // Unique identifier for the user
  username: string; // User display name
  email: string; // User email for login
  password: string; // User password
  role: "user" | "admin" | "owner"; // Role of the user, restricted to specific roles
  created_at: Date; // Timestamp of account creation
}
