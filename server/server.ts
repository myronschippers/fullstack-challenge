import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import multer from 'multer';
import { parseCustomerCsv, parsePurchasesCsv } from './csvService';

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

const postCsvFileCallback = (
  fileType: 'customers' | 'purchases' | 'claims'
) => {
  return async (req: Request, res: Response) => {
    if (req.file == undefined) {
      return res.status(400).send('Please upload a CSV file for Customers!');
    }

    try {
      switch (fileType) {
        case 'customers':
          await parseCustomerCsv(req.file);
          break;
        case 'purchases':
          await parsePurchasesCsv(req.file);
      }

      return res.send(201);
    } catch (err) {
      console.log(err);
      res.status(500).send({
        message: 'Failed to upload the file: ' + req.file.originalname,
      });
    }
  };
};

app.post(
  '/csv-upload/customers',
  upload.single('customers'),
  postCsvFileCallback('customers')
);

app.post(
  '/csv-upload/purchases',
  upload.single('purchases'),
  postCsvFileCallback('purchases')
);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
