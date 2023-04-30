import fs from 'fs';
import { parse } from 'csv';

const parser = parse({ columns: true }, function (err, records) {
  console.log(records);
});

const parseCustomerCsv = async () => {
  fs.createReadStream(`${__dirname}/data-files/customers.csv`).pipe(parser);
};

export { parseCustomerCsv };
