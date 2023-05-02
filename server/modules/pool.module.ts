import {
  HOST,
  USER,
  PASSWORD,
  DB_PORT,
  DATABASE,
  POOL_MAX,
  POOL_IDLE_TIMEOUT,
} from '../configs/db.config';
const pg = require('pg');

const config = {
  host: HOST,
  user: USER,
  password: PASSWORD,
  port: DB_PORT,
  database: DATABASE,
  max: POOL_MAX,
  idleTimeoutMillis: POOL_IDLE_TIMEOUT,
};

// creation of pool to be shared by other modules
export const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err: any) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});
