import "dotenv/config";
import { Pool } from "pg";

let pool: Pool | null = null; // Singelton

export function getPostgresPool(): Pool {
  if (!pool) {
    pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,

      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 2_000,
    });

    pool.on("error", (err) => {
      console.error("Unexpected PG pool error", err);
      process.exit(1);
    });
  }

  return pool;
}