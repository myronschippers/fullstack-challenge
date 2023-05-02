import { Request, Response, Router } from 'express';

const router = Router();

/**
 * Retrieve all claims for a specific customer
 */
router.get('/customer/:id', async (req: Request, res: Response) => {
  res.send({ message: 'ALL CLAIMS FOR A SPECIFIC CUSTOMER' });
});

export default router;
