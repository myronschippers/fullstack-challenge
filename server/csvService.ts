import { createReadStream } from 'streamifier';
import { parse } from 'csv';
import { CustomersController, CustomerCsv } from './db/customers';
import { PurchasesController, PurchaseCsv } from './db/purchases';
import { ClaimsController, ClaimCsv } from './db/claims';

const csvReadStreamPromise = <DbModelType, ReturnType>(
  csvFile: Express.Multer.File,
  asyncRecordsCallback: (records: DbModelType) => Promise<ReturnType>
) => {
  return new Promise((resolve, reject) => {
    let responseResult: ReturnType;
    // solution for fs.createReadStream not being able to read multer buffer
    // https://dev.to/petrussola/upload-csv-parse-rows-and-save-each-row-to-mongodb-in-an-express-server-5738
    createReadStream(csvFile.buffer)
      .pipe(
        parse({ columns: true }, async function (parseError, records) {
          responseResult = await asyncRecordsCallback(records);
        })
      )
      .on('error', (err) => {
        reject(err);
      })
      .on('end', () => {
        resolve(responseResult);
      });
  });
};

export const parseCustomerCsv = async (
  customersCsvFile: Express.Multer.File
) => {
  try {
    const parseResponse = await csvReadStreamPromise<CustomerCsv[], void>(
      customersCsvFile,
      CustomersController.createInBulk
    );
    return parseResponse;
  } catch (err) {
    console.error('Customers Csv ERROR::', err);
    throw new Error('Error parsing Customers CSV File.');
  }
};

export const parsePurchasesCsv = async (
  purchasesCsvFile: Express.Multer.File
) => {
  try {
    const parseResponse = await csvReadStreamPromise<PurchaseCsv[], void>(
      purchasesCsvFile,
      PurchasesController.createInBulk
    );
    return parseResponse;
  } catch (err) {
    console.error('Purchases CSV ERROR::', err);
    throw new Error('Error parsing Purchases CSV File.');
  }
};

export const parseClaimsCsv = async (claimsCsvFile: Express.Multer.File) => {
  try {
    const parseResponse = await csvReadStreamPromise<ClaimCsv[], ClaimCsv[]>(
      claimsCsvFile,
      ClaimsController.createInBulk
    );
    return parseResponse;
  } catch (err) {
    console.error('Claims CSV ERROR::', err);
    throw new Error('Error parsing Claims CSV File.');
  }
};
