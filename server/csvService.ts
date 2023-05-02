import { createReadStream } from 'streamifier';
import { parse } from 'csv';
import { CustomersController, CustomerCsv } from './db/customers';
import { PurchasesController, PurchaseCsv } from './db/purchases';

const csvReadStreamPromise = <DbModelType>(
  csvFile: Express.Multer.File,
  asyncRecordsCallback: (records: DbModelType) => Promise<void>
) => {
  return new Promise((resolve, reject) => {
    // solution for fs.createReadStream not being able to read multer buffer
    // https://dev.to/petrussola/upload-csv-parse-rows-and-save-each-row-to-mongodb-in-an-express-server-5738
    createReadStream(csvFile.buffer)
      .pipe(
        parse({ columns: true }, async function (parseError, records) {
          await asyncRecordsCallback(records);
        })
      )
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve({ message: 'File Loaded Successfully' });
      });
  });
};

export const parseCustomerCsv = async (
  customersCsvFile: Express.Multer.File
) => {
  try {
    const parseResponse = await csvReadStreamPromise<CustomerCsv[]>(
      customersCsvFile,
      CustomersController.createInBulk
    );
    return parseResponse;
  } catch (err) {
    console.log('parseCustomerCsv ERROR::', err);
    throw new Error('Error parsing Customers CSV File.');
  }
};

export const parsePurchasesCsv = async (
  purchasesCsvFile: Express.Multer.File
) => {
  try {
    const parseResponse = await csvReadStreamPromise<PurchaseCsv[]>(
      purchasesCsvFile,
      PurchasesController.createInBulk
    );
    return parseResponse;
  } catch (err) {
    console.log('parseCustomerCsv ERROR::', err);
    throw new Error('Error parsing Customers CSV File.');
  }
};
