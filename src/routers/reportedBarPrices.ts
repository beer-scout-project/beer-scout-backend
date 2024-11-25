import { Hono } from "hono";
import {
  reportBarPriceHandler,
  getReportedBarPricesHandler,
  ignoreReportsHandler,
  removeBarPriceHandler,
} from "../handlers/reportedBarPrices";

const reportedBarPricesRouter = new Hono();

// Route to report a bar price
reportedBarPricesRouter.post("/report", reportBarPriceHandler);

// Route to get reported bar prices 
reportedBarPricesRouter.get("/getReports", getReportedBarPricesHandler);

// Route to ignore reports 
reportedBarPricesRouter.post("/ignoreReports", ignoreReportsHandler);

// Route to remove bar price and reports 
reportedBarPricesRouter.post("/removeBarPrice", removeBarPriceHandler);

export default reportedBarPricesRouter;
