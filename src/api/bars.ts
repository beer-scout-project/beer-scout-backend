import { selectBarsByLocation, insertBar, deleteBar } from "../data/bars";

export const getBarsByLocationApi = async (location: string) => {
  return await selectBarsByLocation(location);
};

export const createBarApi = async (
  name: string,
  address: string,
  location: string
) => {
  return await insertBar(name, address, location);
};

export const removeBarApi = async (id: number) => {
  return await deleteBar(id);
};
