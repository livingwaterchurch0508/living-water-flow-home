import { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

/** mysql */
// export default {
//   schema: "./util/db/schema.ts", // Path to your schema
//   driver: "mysql2",
//   dbCredentials: {
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     host: process.env.DATABASE_HOST || "",
//     port: Number(process.env.DATABASE_PORT),
//     database: process.env.DATABASE_SCHEMA || "",
//   },
// } satisfies Config;

// /** sqlite turso */
// export default {
//   out: "./drizzle",
//   schema: "./app/(util)/db/sqlite/schema.ts",
//   dialect: "turso",
//   dbCredentials: {
//     url: process.env.SQLITE_DATABASE_URL!,
//     authToken: process.env.SQLITE_DATABASE_AUTH_TOKEN,
//   },
// } satisfies Config;

/** sqlite */
export default {
  out: "./drizzle",
  schema: "./app/(util)/db/sqlite/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
} satisfies Config;
