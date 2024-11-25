import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import barPricesRouter from "./routers/barPrices";
import usersRouter from "./routers/users";
import newBarPricesRouter from "./routers/newBarPrices";
import reportedBarPricesRouter from "./routers/reportedBarPrices";

const app = new Hono();

app.use(
  cors({
    origin: ["https://beerscout.ca", "http://localhost:5173"],
    credentials: true,
  })
);

app.route("/barPrices", barPricesRouter);
app.route("/newBarPrices", newBarPricesRouter);
app.route("/reportedBarPrices", reportedBarPricesRouter);
app.route("/users", usersRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const port = 8787;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
