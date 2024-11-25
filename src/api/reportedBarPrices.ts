import {
  insertReportedBarPrice,
  selectReportedBarPrices,
  deleteReportsByBarPriceId,
  removeBarPriceAndReports,
} from "../data/reportedBarPrices";
import { selectBarPriceById } from "../data/barPrices"; // You'll need to create this function if it doesn't exist

// API function to report a bar price
export const reportBarPriceApi = async (barPriceId: number, reason: string) => {
  const barPrice = await selectBarPriceById(barPriceId);
  if (!barPrice) {
    throw new Error("Bar price not found");
  }

  return await insertReportedBarPrice(barPrice, reason);
};

// API function to get all reported bar prices
export const getReportedBarPricesApi = async () => {
  return await selectReportedBarPrices();
};

// API function to ignore reports
export const ignoreReportsApi = async (barPriceId: number) => {
  await deleteReportsByBarPriceId(barPriceId);
};

// API function to remove bar price and its reports
export const removeBarPriceApi = async (barPriceId: number) => {
  await removeBarPriceAndReports(barPriceId);
};