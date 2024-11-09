import { Context } from "hono";
import { getUserByEmailAndPassword } from "../api/users";
import { setCookie, deleteCookie } from "hono/cookie";

// Handler for user login
export const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const user = await getUserByEmailAndPassword(email, password);

    if (user) {
      const sessionId = user.id;

      console.log(`Generated sessionId for user: ${sessionId}`);

      // Set a session cookie
      setCookie(c, "sessionId", sessionId, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: 60 * 60, // 1 hour session
        sameSite: "Strict",
      });

      return c.json({ message: "Login successful", user }, 200);
    } else {
      return c.json({ error: "Invalid email or password" }, 401);
    }
  } catch (error: any) {
    console.log(`Login error: ${error.message}`);
    return c.json({ error: "Failed to login", details: error.message }, 500);
  }
};

// Handler for user logout
export const logoutUser = async (c: Context) => {
  try {
    deleteCookie(c, "sessionId", { path: "/", secure: true });
    console.log("Session cookie deleted");
    return c.json({ message: "Logged out successfully" }, 200);
  } catch (error: any) {
    console.log(`Logout error: ${error.message}`);
    return c.json({ error: "Failed to logout", details: error.message }, 500);
  }
};
