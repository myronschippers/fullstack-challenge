import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { parseCustomerCsv } from './csvService';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('SUPER!!! Server is running.');
});

app.get('/csv-customers', (req: Request, res: Response) => {
  parseCustomerCsv();
  res.send('HOOK UP CSV Processing for Customers Data');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
