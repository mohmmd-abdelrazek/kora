import { Pool } from "pg";
import fs from "fs";
import path from "path";

// Construct the path to your CA certificate file
const caCertPath = path.resolve(__dirname, process.env.CERT_PATH || "../certs/ca.pem");

// Read the CA certificate file
const caCert = fs.readFileSync(caCertPath).toString();

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT),
  ssl: {
    rejectUnauthorized: true,
    ca: caCert,
  },
});

export default pool;
