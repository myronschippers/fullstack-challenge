import format from 'pg-format';
import { pool } from '../../modules/pool.module';
import { PurchaseCsv, PurchasesFullCount } from './purchase.model';

export class PurchasesController {
  static tableName = 'purchases';

  public static async createInBulk(
    purchaseCsvRecords: PurchaseCsv[]
  ): Promise<void> {
    const purchasesCsvValuesOnly = purchaseCsvRecords.map((csvPurchase) => {
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
      purchasesCsvValuesOnly
    );

    await pool.query(formattedQuery);
  }

  /**
   * Retrieves a count of the total number of purchases in the database.
   * @returns { count: number }
   */
  public static async readFullCount(): Promise<PurchasesFullCount> {
    const queryText = `
      SELECT COUNT(*)
      FROM ${PurchasesController.tableName}
    `;

    const dbResponse = await pool.query(queryText);

    return dbResponse.rows[0];
  }
}
