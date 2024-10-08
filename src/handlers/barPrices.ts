import { Context } from 'hono';
import { addBarPriceApi, getBarPricesApi } from '../api/barPrices';

// Handler to add a new bar price
export const addBarPriceHandler = async (c: Context) => {
  try {
    // Parse the JSON data (barData) from the request
    const barPriceData = await c.req.json();

    // Call the API function to add the bar price to the database
    const addedBarPrice = await addBarPriceApi(barPriceData);

    // Return the newly added bar price
    return c.json(
      { barPrice: addedBarPrice, message: 'Bar price added successfully' },
      201
    );

    // handle error
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        { error: 'Failed to add bar price', details: error.message },
        500
      );
    } else {
      return c.json({ error: 'An unknown error occurred' }, 500);
    }
  }
};

// Handler to get the latest bar prices by location
export const getBarPricesHandler = async (c: Context) => {
  try {
    // Get location from request parameters
    const location = c.req.param('location');

    if (!location) {
      return c.json({ error: 'Location is required' }, 400);
    }

    // Fetch the latest bar prices for the location
    const barPrices = await getBarPricesApi(location);

    // Return the fetched bar prices
    return c.json({ barPrices }, 200);
  } catch (error) {
    if (error instanceof Error) {
      return c.json(
        { error: 'Failed to get bar price', details: error.message },
        500
      );
    } else {
      return c.json({ error: 'An unknown error occurred' }, 500);
    }
  }
};
