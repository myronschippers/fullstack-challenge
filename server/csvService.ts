import { createReadStream } from 'streamifier';
import { parse } from 'csv';

const parser = parse({ columns: true }, function (err, records) {
  console.log(records);
});

const parseCustomerCsv = async (customersCsvFile: Express.Multer.File) => {
  try {
    // solution for fs.createReadStream not being able to read multer buffer
    // https://dev.to/petrussola/upload-csv-parse-rows-and-save-each-row-to-mongodb-in-an-express-server-5738
    createReadStream(customersCsvFile.buffer).pipe(parser);
  } catch (err) {
    console.log('parseCustomerCsv ERROR::', err);
    throw new Error('Error parsing Customers CSV File.');
  }
};

export { parseCustomerCsv };
