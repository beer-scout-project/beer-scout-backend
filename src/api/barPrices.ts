import { selectLatestBarPricesByLocation } from "../data/barPrices";

// // API function to add a new bar price
// export const addBarPriceApi = async (barPriceData: any) => {
//   try {
//     // Call the data function to insert the bar price into the database
//     const addedBarPrice = await insertBarPrice(barPriceData);

//     // Return the newly added bar price
//     return addedBarPrice;
//   } catch (error) {
//     throw new Error(`Error adding bar price: ${error}`);
//   }
// };

// Updated API function to get the latest bar prices for a location
export const getBarPricesApi = async (location: string) => {
  try {
    // Call the data function to get the latest bar prices for the location
    const barPrices = await selectLatestBarPricesByLocation(location);

    // Return the filtered and latest bar prices
    return barPrices;
  } catch (error) {
    throw new Error(`Error fetching bar prices: ${error}`);
  }
};
