import crypto, { UUID } from 'crypto';
import { Request, Response, Router } from 'express';
import validator from 'validator';
import { ClaimsController } from '../db/claims';
import { CustomersController } from '../db/customers';

const router = Router();

/**
 * Retrieve all claims for a specific customer
 */
router.get('/customer/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!validator.isUUID(id)) {
    res.status(400).send({
      message: 'Must provide valid UUID for the Customer ID.',
    });
    return;
  }

  const customer = await CustomersController.readCustomer(id as UUID);

  if (!customer) {
    res.status(404).send({
      message: 'There is NO Customer record matching the provided ID.',
    });
    return;
  }

  const claims = await ClaimsController.readForCustomer(id as UUID);

  res.send({
    customer,
    claims,
  });
});

export default router;
