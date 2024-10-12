import { MySql2Database } from "drizzle-orm/mysql2";
import { desc, eq, sql } from "drizzle-orm";

import { getDb } from "./dbConnection";
import { hymns } from "./schema";
import { IError, IHymn, IPage } from "@/app/(variables)/interfaces";
import { HYMN_TAB } from "@/app/(variables)/enums";

export interface IHymns {
  total: number;
  hymns: IHymn[];
  totalPages: number;
}

export type IHymnsType = Awaited<IError> | Awaited<IHymns> | null;

export async function getHymns({ limit = 10, offset = 1, type = 0 }: IPage) {
  const db: MySql2Database<Record<string, never>> | null = await getDb();

  if (!db) return null;

  try {
    const [results] = await db
      .select({ total: sql<number>`count(*) as total` })
      .from(hymns)
      .where(eq(hymns.type, type));

    const total = results.total || 0;

    return {
      total,
      hymns: await db
        .select()
        .from(hymns)
        .where(eq(hymns.type, type))
        .orderBy(desc(hymns.createdAt))
        .limit(limit)
        .offset(offset),
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    return error as { message: string };
  }
}

export interface IHymnsById {
  ids: { id: number | null }[];
  hymns: IHymn[];
}

export type IHymnType = Awaited<IError> | Awaited<IHymnsById> | null;

export async function getHymnsById(id: number, type: HYMN_TAB) {
  const db: MySql2Database<Record<string, never>> | null = await getDb();

  if (!db) return null;

  try {
    const ids = await db
      .select({ id: hymns.id })
      .from(hymns)
      .orderBy(desc(hymns.createdAt))
      .where(eq(hymns.type, type));

    return {
      ids,
      hymns: await db.select().from(hymns).where(eq(hymns.id, id)),
    };
  } catch (error) {
    return error as { message: string };
  }
}
