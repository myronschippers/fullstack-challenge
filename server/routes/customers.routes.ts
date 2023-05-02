import { Request, Response, Router } from 'express';
import { CustomersController } from '../db/customers';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const page = !req.query.page ? undefined : parseInt(req.query.page as string);
  const limit = !req.query.limit
    ? undefined
    : parseInt(req.query.limit as string);

  const customersPaginated = await CustomersController.readAsPaginated(
    page,
    limit
  );

  res.send(customersPaginated);
});

export default router;
