import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: { rejectUnauthorized: false },
});

export default pool;
