import { Context } from "hono";
import { getBarsByLocationApi, createBarApi, removeBarApi } from "../api/bars";

export const getBarsByLocationHandler = async (c: Context) => {
  try {
    const location = c.req.param("location");
    if (!location) {
      return c.json({ error: "Location is required" }, 400);
    }

    const bars = await getBarsByLocationApi(location);
    return c.json({ bars }, 200);
  } catch (error: any) {
    return c.json(
      { error: "Failed to fetch bars", details: error.message },
      500
    );
  }
};

export const createBarHandler = async (c: Context) => {
  try {
    const { name, address, location } = await c.req.json();
    if (!name || !address || !location) {
      return c.json({ error: "Name, address, and location are required" }, 400);
    }

    const newBar = await createBarApi(name, address, location);
    return c.json({ bar: newBar, message: "Bar created successfully" }, 201);
  } catch (error: any) {
    return c.json(
      { error: "Failed to create bar", details: error.message },
      500
    );
  }
};

export const deleteBarHandler = async (c: Context) => {
  try {
    const idParam = c.req.param("id");
    const id = parseInt(idParam, 10);

    if (isNaN(id)) {
      return c.json({ error: "Invalid bar ID" }, 400);
    }

    const deletedBar = await removeBarApi(id);
    if (!deletedBar) {
      return c.json({ error: "Bar not found" }, 404);
    }

    return c.json(
      { message: "Bar deleted successfully", bar: deletedBar },
      200
    );
  } catch (error: any) {
    return c.json(
      { error: "Failed to delete bar", details: error.message },
      500
    );
  }
};
