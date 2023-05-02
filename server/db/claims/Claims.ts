import format from 'pg-format';
import { pool } from '../../modules/pool.module';
import { ClaimCsv } from './claim.model';
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
        console.log('[CHECK CLAIM]:', queryText);
        const customersResponse = await pool.query(queryText);
        console.log('[CHECK CLAIM]:', customersResponse);

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
}
