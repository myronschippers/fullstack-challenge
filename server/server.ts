import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import csvUploadRouter from './routes/csvUpload.routes';
import customersRouter from './routes/customers.routes';

dotenv.config();

const PORT = process.env.PORT || 8080;
const app: Express = express();

//
// CONFIGURING MIDDLEWARE
// --------------------
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//
// REGISTER ROUTES
// --------------------
app.use('/csv-upload', csvUploadRouter);
// TODO: Create a route to GET the total count of "purchases", "claims", & "customers"
app.use('/customers', customersRouter);
// TODO: Create a route to GET all "claims" for a single "customer"

//
// CLIENT APP REGISTRATION
// --------------------
// TODO: serve up React App
app.get('/', (req: Request, res: Response) => {
  res.send('SUPER!!! Server is running.');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
