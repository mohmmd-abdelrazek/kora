import { Pool } from "pg";
import fs from "fs";
import path from "path";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

// Use path.resolve to construct an absolute path to ca.pem
const caCertPath = path.resolve(__dirname, "./ca.pem");

const pool = new Pool({
  connectionString: connectionString,
  ssl: { 
    ca: fs.readFileSync(caCertPath),
    rejectUnauthorized: process.env.EXPRESS_ENV === "production"
  },
});

export default pool;
