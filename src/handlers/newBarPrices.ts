import { Context } from "hono";
import {
  addNewBarPriceApi,
  getNewBarPricesApi,
  approveNewBarPriceApi,
  declineNewBarPriceApi,
} from "../api/newBarPrices";

// Handler to add a new bar price
export const addNewBarPriceHandler = async (c: Context) => {
  try {
    const barPriceData = await c.req.json();
    const addedBarPrice = await addNewBarPriceApi(barPriceData);

    return c.json(
      { barPrice: addedBarPrice, message: "New bar price added successfully" },
      201
    );
  } catch (error) {
    return c.json(
      //@ts-ignore
      { error: "Failed to add new bar price", details: error.message },
      500
    );
  }
};

// Handler to get new bar prices by location
export const getNewBarPricesHandler = async (c: Context) => {
  try {
    const location = c.req.param("location");

    if (!location) {
      return c.json({ error: "Location is required" }, 400);
    }

    const barPrices = await getNewBarPricesApi(location);

    return c.json({ barPrices }, 200);
  } catch (error) {
    return c.json(
      //@ts-ignore
      { error: "Failed to get new bar prices", details: error.message },
      500
    );
  }
};

// Handler to approve a new bar price
export const approveNewBarPriceHandler = async (c: Context) => {
  try {
    const { priceId } = await c.req.json();

    if (!priceId) {
      return c.json({ error: "Price ID is required" }, 400);
    }

    const approvedPrice = await approveNewBarPriceApi(priceId);

    return c.json(
      { message: "Bar price approved and moved to bar_prices", approvedPrice },
      200
    );
  } catch (error) {
    return c.json(
      //@ts-ignore
      { error: "Failed to approve bar price", details: error.message },
      500
    );
  }
};

// Handler to decline a new bar price
export const declineNewBarPriceHandler = async (c: Context) => {
  try {
    const { priceId } = await c.req.json();

    if (!priceId) {
      return c.json({ error: "Price ID is required" }, 400);
    }

    await declineNewBarPriceApi(priceId);

    return c.json({ message: "Bar price declined and removed" }, 200);
  } catch (error) {
    return c.json(
      //@ts-ignore
      { error: "Failed to decline bar price", details: error.message },
      500
    );
  }
};
