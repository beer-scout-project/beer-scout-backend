import { Hono } from "hono";
import { loginUser, logoutUser } from "../handlers/users";
import { verifySession } from "../middleware/session";
import { User } from "../types";

const UsersRouter = new Hono();

// Endpoint for user login
UsersRouter.post("/login", loginUser);

// Endpoint for user logout
UsersRouter.post("/logout", logoutUser);

// Route to check session and retrieve user profile
UsersRouter.get("/profile", verifySession, (c) => {
  //@ts-ignore
  const user = c.get("user") as User;
  return c.json({ message: "Profile access", user }, 200);
});

export default UsersRouter;
