import { getSql } from "./db";

export const selectBarsByLocation = async (location: string) => {
  const sql = await getSql();
  const result = await sql`
    SELECT * FROM bars
    WHERE location = ${location}
    ORDER BY name;
  `;
  return result;
};

export const insertBar = async (
  name: string,
  address: string,
  location: string
) => {
  const sql = await getSql();
  const [newBar] = await sql`
    INSERT INTO bars (name, address, location)
    VALUES (${name}, ${address}, ${location})
    RETURNING *;
  `;
  return newBar;
};

export const deleteBar = async (id: number) => {
  const sql = await getSql();
  const [deleted] = await sql`
    DELETE FROM bars
    WHERE id = ${id}
    RETURNING *;
  `;
  return deleted;
};
