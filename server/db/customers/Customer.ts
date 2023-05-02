import format from 'pg-format';
import { pool } from '../../modules/pool.module';
import { CustomerCsv } from './customer.dto';

export class CustomersController {
  static tableName = 'customers';

  public static async createInBulk(
    customerCsvRecords: CustomerCsv[]
  ): Promise<void> {
    const customerCsvValuesOnly = customerCsvRecords.map((csvCustomer) => {
      return [
        csvCustomer.id,
        csvCustomer.firstName,
        csvCustomer.lastName,
        csvCustomer.createdAt,
        csvCustomer.updatedAt,
      ];
    });
    const formattedQuery = format(
      `INSERT INTO ${CustomersController.tableName} ("id", "firstName", "lastName", "createdAt", "updatedAt") VALUES %L`,
      customerCsvValuesOnly
    );

    await pool.query(formattedQuery);
  }
}
