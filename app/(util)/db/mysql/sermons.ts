import { MySql2Database } from "drizzle-orm/mysql2";
import { desc, eq, sql } from "drizzle-orm";
import { getDb } from "./dbConnection";
import { sermons } from "./schema";
import { IError, IPage, ISermon } from "@/app/(variables)/interfaces";
import { SERMON_TAB } from "@/app/(variables)/enums";

export interface ISermons {
  total: number;
  sermons: ISermon[];
  totalPages: number;
}

export type ISermonsType = Awaited<IError> | Awaited<ISermons> | null;

export async function getSermons({ limit = 10, offset = 1, type = 0 }: IPage) {
  const db: MySql2Database<Record<string, never>> | null = await getDb();

  if (!db) return null;

  try {
    const [results] = await db
      .select({ total: sql<number>`count(*) as total` })
      .from(sermons)
      .where(eq(sermons.type, type));

    const total = results.total || 0;

    return {
      total,
      sermons: await db
        .select()
        .from(sermons)
        .where(eq(sermons.type, type))
        .orderBy(desc(sermons.createdAt))
        .limit(limit)
        .offset(offset),
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    return error as { message: string };
  }
}

export interface ISermonsById {
  ids: { id: number | null }[];
  sermons: ISermon[];
}

export type ISermonType = Awaited<IError> | Awaited<ISermonsById> | null;

export async function getSermonsById(id: number, type: SERMON_TAB) {
  const db: MySql2Database<Record<string, never>> | null = await getDb();

  if (!db) return null;

  try {
    const ids = await db
      .select({ id: sermons.id })
      .from(sermons)
      .orderBy(desc(sermons.createdAt))
      .where(eq(sermons.type, type));

    return {
      ids,
      sermons: await db.select().from(sermons).where(eq(sermons.id, id)),
    };
  } catch (error) {
    return error as { message: string };
  }
}
