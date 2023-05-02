import { Request, Response, Router } from 'express';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  res.send({ message: 'Paginated List of Customers' });
});

export default router;
