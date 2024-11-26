import {
  insertReportedBarPrice,
  selectReportedBarPrices,
  deleteReportsByBarPriceId,
  removeBarPriceAndReports,
} from "../data/reportedBarPrices";
import { selectBarPriceById } from "../data/barPrices";

// API function to report a bar price
export const reportBarPriceApi = async (barPriceId: number, reason: string) => {
  const barPrice = await selectBarPriceById(barPriceId);
  if (!barPrice) {
    throw new Error("Bar price not found");
  }

  return await insertReportedBarPrice(barPrice, reason);
};

// API function to get reported bar prices by location
export const getReportedBarPricesApi = async (location: string) => {
  return await selectReportedBarPrices(location);
};

// API function to ignore reports
export const ignoreReportsApi = async (barPriceId: number) => {
  await deleteReportsByBarPriceId(barPriceId);
};

// API function to remove bar price and its reports
export const removeBarPriceApi = async (barPriceId: number) => {
  await removeBarPriceAndReports(barPriceId);
};
