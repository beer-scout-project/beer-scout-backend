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

// Route to get reported bar prices (admin)
reportedBarPricesRouter.get("/getReports", getReportedBarPricesHandler);

// Route to ignore reports (admin)
reportedBarPricesRouter.post("/ignoreReports", ignoreReportsHandler);

// Route to remove bar price and reports (admin)
reportedBarPricesRouter.post("/removeBarPrice", removeBarPriceHandler);

export default reportedBarPricesRouter;
