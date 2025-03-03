import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

declare global {
  var _mysqlPool: mysql.Pool | undefined;
}

let pool: mysql.Pool;

if (!globalThis._mysqlPool) {
  globalThis._mysqlPool = createNewPool();
}

pool = globalThis._mysqlPool;

export const db = drizzle(pool);

function createNewPool() {
  return mysql.createPool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_SCHEMA,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
  });
}

export async function getDb() {
  try {
    const connection = await pool.getConnection();
    connection.release(); // 연결 테스트 후 해제
    return db; // 🔹 풀 기반 Drizzle ORM 반환
  } catch (error) {
    console.error("MySQL connection failed, recreating pool...", error);
    globalThis._mysqlPool = createNewPool(); // 🔹 새로운 연결 풀 생성
    pool = globalThis._mysqlPool;
    return db;
  }
}
