import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

export const getDb = async () => {
  try {
    const client = createClient({
      url: process.env.SQLITE_DATABASE_URL!,
      authToken: process.env.SQLITE_DATABASE_AUTH_TOKEN,
    });

    return drizzle(client);
  } catch (e) {
    return null;
  }
};
