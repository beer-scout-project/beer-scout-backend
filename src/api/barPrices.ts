import { insertBarPrice, selectBarPricesByLocation } from '../data/barPrices';

// API function to add a new bar price
export const addBarPriceApi = async (barPriceData: any) => {
  try {
    // Call the data function to insert the bar price into the database
    const addedBarPrice = await insertBarPrice(barPriceData);

    // Return the newly added bar price
    return addedBarPrice;
  } catch (error) {
    throw new Error(`Error adding bar price: ${error}`);
  }
};

// API function to get all bar prices for a location
export const getBarPricesApi = async (location: string) => {
  // Call the data function to get all bar prices for the location
  const barPrices = await selectBarPricesByLocation(location);
  // Return the list of bar prices
  return barPrices;
};
