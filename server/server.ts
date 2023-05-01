import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import { parseCustomerCsv } from './csvService';
import pool from './modules/pool';

dotenv.config();

const PORT = process.env.PORT || 8080;
const upload = multer({ storage: multer.memoryStorage() });
const app: Express = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('SUPER!!! Server is running.');
});

// test DB connection
app.get('/first-customer', async (req: Request, res: Response) => {
  try {
    const queryText = `SELECT * FROM customers LIMIT 1;`;
    const customersResponse = await pool.query(queryText);

    res.send(customersResponse.rows);
  } catch (err) {
    res.status(500);
    res.send({ error_message: err });
  }
});

app.post(
  '/csv-upload/customers',
  upload.single('customers'),
  async (req: Request, res: Response) => {
    if (req.file == undefined) {
      return res.status(400).send('Please upload a CSV file for Customers!');
    }

    try {
      await parseCustomerCsv(req.file);
      return res.send('Processed Customers Data');
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: 'Failed to upload the file: ' + req.file.originalname,
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
