import {
  insertNewBarPrice,
  selectNewBarPricesByLocation,
  moveBarPriceToApproved,
  deleteNewBarPrice,
} from "../data/newBarPrices";

// API function to add a new bar price
export const addNewBarPriceApi = async (barPriceData: any) => {
  return await insertNewBarPrice(barPriceData);
};

// API function to get new bar prices by location
export const getNewBarPricesApi = async (location: string) => {
  return await selectNewBarPricesByLocation(location);
};

// API function to approve a new bar price
export const approveNewBarPriceApi = async (priceId: number) => {
  return await moveBarPriceToApproved(priceId);
};

// API function to decline a new bar price
export const declineNewBarPriceApi = async (priceId: number) => {
  return await deleteNewBarPrice(priceId);
};
