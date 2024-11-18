import { getSql } from "./db";

// Data function to insert a new bar price into new_bar_prices
export const insertNewBarPrice = async (barPriceData: any) => {
  const sql = await getSql();

  const result = await sql`
    INSERT INTO new_bar_prices (
      bar_name, location, serving_size, price, happy_hour, happy_hour_day, happy_hour_start, happy_hour_end
    ) VALUES (
      ${barPriceData.bar_name}, ${barPriceData.location}, ${
    barPriceData.serving_size
  }, 
      ${barPriceData.price}, ${barPriceData.happy_hour || false}, 
      ${barPriceData.happy_hour_day || null}, ${
    barPriceData.happy_hour_start || null
  }, 
      ${barPriceData.happy_hour_end || null}
    ) RETURNING *;
  `;

  return result[0];
};

// Data function to get new bar prices by location
export const selectNewBarPricesByLocation = async (location: string) => {
  const sql = await getSql();

  const result = await sql`
    SELECT * FROM new_bar_prices WHERE location = ${location};
  `;

  return result;
};

// Data function to move a price from new_bar_prices to bar_prices
export const moveBarPriceToApproved = async (priceId: number) => {
  const sql = await getSql();

  const result = await sql`
    WITH moved_price AS (
      DELETE FROM new_bar_prices
      WHERE id = ${priceId}
      RETURNING *
    )
    INSERT INTO bar_prices (
      bar_name, location, serving_size, price, happy_hour, happy_hour_day, happy_hour_start, happy_hour_end
    )
    SELECT 
      bar_name, location, serving_size, price, happy_hour, happy_hour_day, happy_hour_start, happy_hour_end
    FROM moved_price
    RETURNING *;
  `;

  return result[0];
};

// Data function to delete a new bar price
export const deleteNewBarPrice = async (priceId: number) => {
  const sql = await getSql();

  await sql`
    DELETE FROM new_bar_prices WHERE id = ${priceId};
  `;
};
