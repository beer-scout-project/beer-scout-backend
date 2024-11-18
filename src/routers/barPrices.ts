import { Hono } from "hono";
import { getBarPricesHandler } from "../handlers/barPrices";

const barPricesRouter = new Hono();

// Route to add a new bar price
// barPricesRouter.post("/addBarPrice", addBarPriceHandler);

// Route to get all bar prices
barPricesRouter.get("/getBarPrices/:location", getBarPricesHandler);

export default barPricesRouter;
