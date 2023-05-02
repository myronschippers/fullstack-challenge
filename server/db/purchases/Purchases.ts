import format from 'pg-format';
import { pool } from '../../modules/pool.module';
import { PurchaseCsv } from './purchase.model';

export class PurchasesController {
  static tableName = 'purchases';

  public static async createInBulk(
    purchaseCsvRecords: PurchaseCsv[]
  ): Promise<void> {
    const customerCsvValuesOnly = purchaseCsvRecords.map((csvPurchase) => {
      return [
        csvPurchase.id,
        csvPurchase.invoice,
        csvPurchase.totalSaleAmount,
        csvPurchase.invoiceDate,
        csvPurchase.deliveryDate,
        csvPurchase.name,
        csvPurchase.description,
        csvPurchase.sku,
        csvPurchase.protectionPlanName,
        csvPurchase.protectionPlanDuration,
        csvPurchase.protectionPlanPrice,
        csvPurchase.protectionPlanSku,
        csvPurchase.protectionPlanPeriod,
        csvPurchase.customerId,
        csvPurchase.createdAt,
        csvPurchase.updatedAt,
      ];
    });
    const formattedQuery = format(
      `INSERT INTO ${PurchasesController.tableName} (
        "id",
        "invoice",
        "totalSaleAmount",
        "invoiceDate",
        "deliveryDate",
        "name",
        "description",
        "sku",
        "protectionPlanName",
        "protectionPlanDuration",
        "protectionPlanPrice",
        "protectionPlanSku",
        "protectionPlanPeriod",
        "customerId",
        "createdAt",
        "updatedAt"
      ) VALUES %L`,
      customerCsvValuesOnly
    );

    await pool.query(formattedQuery);
  }
}
