// routers/bars.ts
import { Hono } from "hono";
import {
  getBarsByLocationHandler,
  createBarHandler,
  deleteBarHandler,
} from "../handlers/bars";

const barsRouter = new Hono();

// Public endpoint to get bars by location
barsRouter.get("/getBars/:location", getBarsByLocationHandler);

// Public endpoints to create and delete bars
barsRouter.post("/createBar", createBarHandler);
barsRouter.delete("/deleteBar/:id", deleteBarHandler);

export default barsRouter;
