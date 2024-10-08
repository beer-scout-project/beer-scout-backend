import { getSql } from './db';

// Data function to insert a new bar price
export const insertBarPrice = async (barPriceData: any) => {
  const {
    bar_name,
    location,
    serving_size,
    price,
    happy_hour,
    happy_hour_day,
    happy_hour_start,
    happy_hour_end,
  } = barPriceData;

  const sql = await getSql();

  // Insert the bar price into the database
  const result = await sql`
    INSERT INTO bar_prices (
      bar_name, location, serving_size, price, happy_hour, happy_hour_day, happy_hour_start, happy_hour_end
    ) VALUES (
      ${bar_name}, ${location}, ${serving_size}, ${price}, ${
    happy_hour || false
  }, ${happy_hour_day || null}, ${happy_hour_start || null}, ${
    happy_hour_end || null
  }
    ) RETURNING *;
  `;

  // Return the newly created bar price data
  return result[0];
};

// Data function to get the latest bar prices for a location
export const selectLatestBarPricesByLocation = async (location: string) => {
  const sql = await getSql();

  // Fetch the latest prices for each bar and serving size, along with happy hour prices, filter to only include the latest if there is a matching bar_name and serving_size, ignore if that is a happy hour price.
  const result = await sql`
    WITH ranked_prices AS (
      SELECT 
        *,
        ROW_NUMBER() OVER (
          PARTITION BY bar_name, location, serving_size 
          ORDER BY created_at DESC
        ) as row_num
      FROM bar_prices
      WHERE location = ${location}
    )
    SELECT * 
    FROM ranked_prices
    WHERE (row_num = 1 AND happy_hour = false) 
       OR happy_hour = true;
  `;

  // Return the filtered list of bar prices
  return result;
};