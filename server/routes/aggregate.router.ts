import { Request, Response, Router } from 'express';
import { CustomersController } from '../db/customers';

const router = Router();

router.get('/counts', async (req: Request, res: Response) => {
  res.send({ message: 'GET TOTAL COUNT OF ALL RECORDS' });
});

export default router;
