import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('SUPER!!! Server is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
