// Server hosting the postgres database
export const HOST = (
  process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : 'localhost'
) as string;
export const USER = (
  process.env.POSTGRES_USER ? process.env.POSTGRES_USER : 'postgres'
) as string;
export const PASSWORD = (
  process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : 'postgres'
) as string;
export const DATABASE = (
  process.env.POSTGRES_DB ? process.env.POSTGRES_DB : 'challenge_db'
) as string;
// env var: PGPORT
export const DB_PORT = (
  process.env.PORT_DB ? process.env.PORT_DB : 5432
) as number;
// max number of clients in the pool
export const POOL_MAX = 10;
// how long a client is allowed to remain idle before being closed
export const POOL_IDLE_TIMEOUT = 30000;
// needed for sequelize
export const DIALECT = 'postgres';
