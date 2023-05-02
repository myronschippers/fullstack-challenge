import { Request, Response, Router } from 'express';
import multer from 'multer';
import {
  parseCustomerCsv,
  parsePurchasesCsv,
  parseClaimsCsv,
} from '../services/csv.service';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

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
        case 'claims':
          await parseClaimsCsv(req.file);
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

router.post(
  '/customers',
  upload.single('customers'),
  postCsvFileCallback('customers')
);

router.post(
  '/purchases',
  upload.single('purchases'),
  postCsvFileCallback('purchases')
);

router.post('/claims', upload.single('claims'), postCsvFileCallback('claims'));

export default router;
