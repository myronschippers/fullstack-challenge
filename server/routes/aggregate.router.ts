import { Request, Response, Router } from 'express';
import { ClaimsController } from '../db/claims';
import { CustomersController } from '../db/customers';
import { AllCounts } from '../db/models';
import { PurchasesController } from '../db/purchases';

const router = Router();

/**
 * Retrieve a total number of records for "customers", "purchases", and "claims"
 */
router.get('/counts', async (req: Request, res: Response) => {
  const customersCount = await CustomersController.readFullCount();
  const purchasesCount = await PurchasesController.readFullCount();
  const claimsCount = await ClaimsController.readFullCount();

  const allCounts: AllCounts = {
    totalCustomers: customersCount.count,
    totalPurchases: purchasesCount.count,
    totalClaims: claimsCount.count,
  };

  res.send(allCounts);
});

export default router;
