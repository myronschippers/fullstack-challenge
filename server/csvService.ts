import { createReadStream } from 'streamifier';
import { parse } from 'csv';

const csvReadStreamPromise = (csvFile: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    // solution for fs.createReadStream not being able to read multer buffer
    // https://dev.to/petrussola/upload-csv-parse-rows-and-save-each-row-to-mongodb-in-an-express-server-5738
    createReadStream(csvFile.buffer)
      .pipe(parse({ columns: true }))
      .on('error', (err) => {
        reject(err);
      })
      .on('data', (rowData) => {
        console.log(rowData);
      })
      .on('end', () => {
        resolve({ message: 'File Loaded Successfully' });
      });
  });
};

const parseCustomerCsv = async (customersCsvFile: Express.Multer.File) => {
  try {
    const parseResponse = await csvReadStreamPromise(customersCsvFile);
    return parseResponse;
  } catch (err) {
    console.log('parseCustomerCsv ERROR::', err);
    throw new Error('Error parsing Customers CSV File.');
  }
};

export { parseCustomerCsv };
