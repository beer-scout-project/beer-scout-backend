import { Hono } from 'hono';
import { loginUser, signupUser, logoutUser } from '../handlers/users';

const usersRouter = new Hono();

//router for user login
usersRouter.post('/login', loginUser);

//router for user signup
usersRouter.post('/signup', signupUser);

//router for user logout
usersRouter.post('/logout', logoutUser);

export default usersRouter;
