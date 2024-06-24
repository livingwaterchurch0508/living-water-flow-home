import type { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

export default {
  schema: "./util/db/schema.ts", // Path to your schema
  driver: "mysql2",
  dbCredentials: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST || "",
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_SCHEMA || "",
  },
} satisfies Config;
