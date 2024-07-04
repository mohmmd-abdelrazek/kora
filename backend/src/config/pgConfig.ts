import { Pool } from "pg";
import fs from "fs";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const sslConfig =
  process.env.EXPRESS_ENV === "production"
    ? {
        ca: fs.readFileSync("./ca.pem"),
        rejectUnauthorized: true,
      }
    : false;

const pool = new Pool({
  connectionString: connectionString,
  ssl: sslConfig,
});

export default pool;
