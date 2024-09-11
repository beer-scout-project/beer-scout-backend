import { Hono } from 'hono';
import { addBarPriceHandler } from '../handlers/barPrices';

const barPricesRouter = new Hono();

// Route to add a new bar price
barPricesRouter.post('/add', addBarPriceHandler);

export default barPricesRouter;
