import { getSql } from "./db";

// Function to insert a reported bar price
export const insertReportedBarPrice = async (
  barPriceData: any,
  reason: string
) => {
  const sql = await getSql();

  const result = await sql`
    INSERT INTO reported_bar_prices (
      bar_price_id,
      bar_name,
      location,
      serving_size,
      price,
      happy_hour,
      happy_hour_day,
      happy_hour_start,
      happy_hour_end,
      reason
    ) VALUES (
      ${barPriceData.id},
      ${barPriceData.bar_name},
      ${barPriceData.location},
      ${barPriceData.serving_size},
      ${barPriceData.price},
      ${barPriceData.happy_hour},
      ${barPriceData.happy_hour_day},
      ${barPriceData.happy_hour_start},
      ${barPriceData.happy_hour_end},
      ${reason}
    ) RETURNING *;
  `;

  return result[0];
};

// Function to get reported bar prices with aggregated reasons
export const selectReportedBarPrices = async () => {
  const sql = await getSql();

  const result = await sql`
    SELECT 
      rb.bar_price_id,
      rb.bar_name,
      rb.location,
      rb.serving_size,
      rb.price,
      rb.happy_hour,
      rb.happy_hour_day,
      rb.happy_hour_start,
      rb.happy_hour_end,
      COUNT(*) AS report_count,
      ARRAY_AGG(rb.reason) AS reasons
    FROM reported_bar_prices rb
    GROUP BY rb.bar_price_id, rb.bar_name, rb.location, rb.serving_size, rb.price, rb.happy_hour, rb.happy_hour_day, rb.happy_hour_start, rb.happy_hour_end;
  `;

  return result;
};

// Function to delete reports for a bar price
export const deleteReportsByBarPriceId = async (barPriceId: number) => {
  const sql = await getSql();

  await sql`
    DELETE FROM reported_bar_prices WHERE bar_price_id = ${barPriceId};
  `;
};

// Function to remove a bar price and its reports
export const removeBarPriceAndReports = async (barPriceId: number) => {
  const sql = await getSql();

  await sql.begin(async (sql) => {
    await sql`
      DELETE FROM bar_prices WHERE id = ${barPriceId};
    `;

    await sql`
      DELETE FROM reported_bar_prices WHERE bar_price_id = ${barPriceId};
    `;
  });
};
