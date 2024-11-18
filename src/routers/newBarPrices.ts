import { Hono } from "hono";
import {
  addNewBarPriceHandler,
  getNewBarPricesHandler,
  approveNewBarPriceHandler,
  declineNewBarPriceHandler,
} from "../handlers/newBarPrices";

const newBarPricesRouter = new Hono();

// Route to add a new bar price
newBarPricesRouter.post("/addBarPrice", addNewBarPriceHandler);

// Route to get new bar prices
newBarPricesRouter.get("/getBarPrices/:location", getNewBarPricesHandler);

// Route to approve a new bar price
newBarPricesRouter.post("/approvePrice", approveNewBarPriceHandler);

// Route to decline a new bar price
newBarPricesRouter.delete("/declinePrice", declineNewBarPriceHandler);

export default newBarPricesRouter;
