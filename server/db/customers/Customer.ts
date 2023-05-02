import format from 'pg-format';
import { pool } from '../../modules/pool.module';
import {
  CustomerCsv,
  CustomersPaginated,
  CustomerFullCount,
} from './customer.model';

export class CustomersController {
  static tableName = 'customers';
  static defaultPagerPage = 1;
  static defaultPagerLimit = 10;
  static defaultOrderBy = 'lastName';

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

  /**
   * Retrieves a count of the total number of customers in the database.
   * @returns { count: number }
   */
  public static async readFullCount(): Promise<CustomerFullCount> {
    const queryText = `
      SELECT COUNT(*)
      FROM ${CustomersController.tableName}
    `;

    const dbResponse = await pool.query(queryText);

    return dbResponse.rows[0];
  }

  /**
   * Retrieves a set number of customers based on the limit provided in the form of a pagination object
   * @param page number | undefined
   * @param limit number | undefined
   * @returns CustomersPaginated
   */
  public static async readAsPaginated(
    page: number = CustomersController.defaultPagerPage,
    limit: number = CustomersController.defaultPagerLimit
  ): Promise<CustomersPaginated> {
    const queryText = `
      SELECT *
      FROM ${CustomersController.tableName}
      ORDER BY "lastName"
      LIMIT $2
      OFFSET (($1 - 1) * $2);
    `;

    const dbResponse = await pool.query(queryText, [page, limit]);
    const customers = dbResponse.rows;

    const customersCount = await CustomersController.readFullCount();
    const totalItems = customersCount.count;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      totalItems,
      totalPages,
      currentPage: page,
      customers,
    };
  }
}
