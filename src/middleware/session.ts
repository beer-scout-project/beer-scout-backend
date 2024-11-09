import { getCookie } from "hono/cookie";
import { Context } from "hono";
import { getUserById } from "../api/users";
import { User } from "../types";

// Middleware to verify session
export const verifySession = async (c: Context, next: Function) => {
  const sessionId = getCookie(c, "sessionId"); // Read session ID from cookie

  console.log(`Session ID from cookie: ${sessionId}`);

  if (!sessionId) {
    console.log("No session ID found, returning unauthorized");
    return c.json({ error: "Unauthorized: No session found" }, 401);
  }

  const user = await getUserById(sessionId); // Fetch user using the session ID

  if (!user) {
    console.log("Invalid session ID, returning unauthorized");
    return c.json({ error: "Unauthorized: Invalid session" }, 401);
  }

  console.log(`User retrieved from session: ${JSON.stringify(user)}`);

  c.set("user", user as User);

  await next();
};
