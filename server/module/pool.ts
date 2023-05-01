const pg = require('pg');

const config = {
  host: (process.env.POSTGRES_HOST
    ? process.env.POSTGRES_HOST
    : 'localhost') as string, // Server hosting the postgres database
  user: (process.env.POSTGRES_USER
    ? process.env.POSTGRES_USER
    : 'postgres') as string,
  password: (process.env.POSTGRES_PASSWORD
    ? process.env.POSTGRES_PASSWORD
    : 'postgres') as string,
  port: (process.env.PORT_DB ? process.env.PORT_DB : 5432) as number, // env var: PGPORT
  database: (process.env.POSTGRES_DB
    ? process.env.POSTGRES_DB
    : 'challenge_db') as string, // env var: PGDATABASE
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// creation of pool to be shared by other modules
const pool = new pg.Pool(config);

// the pool with emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err: any) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
