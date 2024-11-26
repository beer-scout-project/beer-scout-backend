import { Context } from "hono";
import {
  reportBarPriceApi,
  getReportedBarPricesApi,
  ignoreReportsApi,
  removeBarPriceApi,
} from "../api/reportedBarPrices";

// Handler to report a bar price
export const reportBarPriceHandler = async (c: Context) => {
  try {
    const { barPriceId, reason } = await c.req.json();

    if (!barPriceId || !reason) {
      return c.json({ error: "Bar price ID and reason are required" }, 400);
    }

    const report = await reportBarPriceApi(barPriceId, reason);

    return c.json({ message: "Bar price reported successfully", report }, 201);
  } catch (error) {
    //@ts-ignore
    return c.json({ error: error.message }, 500);
  }
};

// Handler to get reported bar prices by location
export const getReportedBarPricesHandler = async (c: Context) => {
  try {
    const location = c.req.param("location");

    if (!location) {
      return c.json({ error: "Location parameter is required" }, 400);
    }

    const reports = await getReportedBarPricesApi(location);

    return c.json({ reports }, 200);
  } catch (error) {
    console.error("Error in getReportedBarPricesHandler:", error);
    //@ts-ignore
    return c.json({ error: error.message }, 500);
  }
};

// Handler to ignore reports
export const ignoreReportsHandler = async (c: Context) => {
  try {
    const { barPriceId } = await c.req.json();

    if (!barPriceId) {
      return c.json({ error: "Bar price ID is required" }, 400);
    }

    await ignoreReportsApi(barPriceId);

    return c.json({ message: "Reports ignored successfully" }, 200);
  } catch (error) {
    //@ts-ignore
    return c.json({ error: error.message }, 500);
  }
};

// Handler to remove bar price and its reports
export const removeBarPriceHandler = async (c: Context) => {
  try {
    const { barPriceId } = await c.req.json();

    if (!barPriceId) {
      return c.json({ error: "Bar price ID is required" }, 400);
    }

    await removeBarPriceApi(barPriceId);

    return c.json(
      { message: "Bar price and its reports removed successfully" },
      200
    );
  } catch (error) {
    //@ts-ignore
    return c.json({ error: error.message }, 500);
  }
};
