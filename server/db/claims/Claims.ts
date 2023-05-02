import format from 'pg-format';
import { pool } from '../../modules/pool.module';
import { ClaimCsv, ClaimsFullCount } from './claim.model';
import { CustomersController } from '../customers';

export class ClaimsController {
  static tableName = 'claims';

  public static async createInBulk(
    claimCsvRecords: ClaimCsv[]
  ): Promise<ClaimCsv[]> {
    const csvClaimsWithNoMatchingCustomer: ClaimCsv[] = [];
    const filterClaimsRecordsForCustomerMatch = claimCsvRecords.filter(
      async (csvClaim) => {
        const queryText = `
        SELECT * FROM ${CustomersController.tableName}
        WHERE id = '${csvClaim.customerId}';
        `;
        const customersResponse = await pool.query(queryText);

        if (customersResponse.rows.length > 0) {
          return true;
        } else {
          csvClaimsWithNoMatchingCustomer.push(csvClaim);
          return false;
        }
      }
    );
    const claimsCsvValuesOnly = filterClaimsRecordsForCustomerMatch.map(
      (csvClaim) => {
        return [
          csvClaim.id,
          csvClaim.status,
          csvClaim.solution,
          csvClaim.createdAt,
          csvClaim.updatedAt,
          csvClaim.customerId,
          csvClaim.productPurchaseId,
          csvClaim.productCondition,
          csvClaim.damageDescription ? csvClaim.damageDescription : null,
          csvClaim.damageDate,
        ];
      }
    );
    const formattedQuery = format(
      `INSERT INTO ${ClaimsController.tableName} (
        "id",
        "status",
        "solution",
        "createdAt",
        "updatedAt",
        "customerId",
        "productPurchaseId",
        "productCondition",
        "damageDescription",
        "damageDate"
      ) VALUES %L`,
      claimsCsvValuesOnly
    );

    await pool.query(formattedQuery);

    return csvClaimsWithNoMatchingCustomer;
  }

  /**
   * Retrieves a count of the total number of customers in the database.
   * @returns { count: number }
   */
  public static async readFullCount(): Promise<ClaimsFullCount> {
    const queryText = `
      SELECT COUNT(*)
      FROM ${ClaimsController.tableName}
    `;

    const dbResponse = await pool.query(queryText);

    return dbResponse.rows[0];
  }
}
