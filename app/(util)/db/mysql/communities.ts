import { MySql2Database } from "drizzle-orm/mysql2";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { getDb } from "./dbConnection";
import { communities, files } from "./schema";
import { NEWS_TAB, NEWS_TYPES } from "@/app/(variables)/enums";
import { ICommunity, IError, IPage } from "@/app/(variables)/interfaces";

type Community = typeof communities.$inferSelect;
type File = typeof files.$inferSelect;

export interface ICommunities {
  total: number;
  communities: ICommunity[];
  totalPages: number;
}

export type ICommunitiesType = Awaited<IError> | Awaited<ICommunities> | null;

interface IGetCommunities extends IPage {
  type?: NEWS_TYPES;
}

export async function getCommunities({
  type = NEWS_TYPES.ALL,
  offset = 0,
  limit = 10,
}: IGetCommunities) {
  const db: MySql2Database<Record<string, never>> | null = await getDb();

  if (!db) return null;

  try {
    let totalQuery: any = db
      .select({ total: sql<number>`count(*) as total` })
      .from(communities);

    if (type !== NEWS_TYPES.ALL) {
      totalQuery = totalQuery.where(eq(communities.type, type));
    }

    const [results] = await totalQuery;

    const total = results.total || 0;
    let rows;

    let query: any = db
      .select()
      .from(communities)
      .orderBy(desc(communities.createdAt))
      .limit(limit)
      .offset(offset);

    if (type !== NEWS_TYPES.ALL) {
      query = query.where(eq(communities.type, type));
    }

    const communitiesRows = await query;

    const communityIds = communitiesRows.map(
      (community: ICommunity) => community.id,
    );

    if (type === NEWS_TYPES.ALL) {
      rows = await db
        .select({ community: communities, file: files })
        .from(communities)
        .leftJoin(files, eq(communities.id, files.communityId))
        .where(inArray(communities.id, communityIds))
        .orderBy(desc(communities.createdAt));
    } else {
      rows = await db
        .select({ community: communities, file: files })
        .from(communities)
        .leftJoin(files, eq(communities.id, files.communityId))
        .where(
          and(
            inArray(communities.id, communityIds),
            eq(communities.type, type),
          ),
        )
        .orderBy(desc(communities.createdAt));
    }

    const result = rows.reduce<
      Record<number, { community: Community; files: File[] }>
    >((acc, row) => {
      const community = row.community;
      const file = row.file;

      if (!acc[community.id]) {
        acc[community.id] = { community, files: [] };
      }
      if (file) {
        acc[community.id].files.push(file);
      }
      return acc;
    }, {});

    return {
      total,
      communities: Object.values(result)
        .map(({ community, files }) => ({
          ...community,
          files,
        }))
        .sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            if (a.createdAt > b.createdAt) return -1;
          }
          return 0;
        }),
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    return error as { message: string };
  }
}

export interface ICommunitiesById {
  ids: { id: number | null }[];
  communities: ICommunity[];
}

export type ICommunityType = Awaited<IError> | Awaited<ICommunitiesById> | null;

export async function getCommunitiesById(id: number, type: NEWS_TAB) {
  const db: MySql2Database<Record<string, never>> | null = await getDb();

  if (!db) return null;

  try {
    const ids = await db
      .select({ id: communities.id })
      .from(communities)
      .orderBy(desc(communities.createdAt))
      .where(eq(communities.type, type));

    const rows = await db
      .select({ community: communities, file: files })
      .from(communities)
      .leftJoin(files, eq(communities.id, files.communityId))
      .where(and(inArray(communities.id, [id]), eq(communities.type, type)))
      .orderBy(desc(communities.createdAt));

    const result = rows.reduce<
      Record<number, { community: Community; files: File[] }>
    >((acc, row) => {
      const community = row.community;
      const file = row.file;

      if (!acc[community.id]) {
        acc[community.id] = { community, files: [] };
      }
      if (file) {
        acc[community.id].files.push(file);
      }
      return acc;
    }, {});

    return {
      ids,
      communities: Object.values(result).map(({ community, files }) => ({
        ...community,
        files,
      })),
    };
  } catch (error) {
    return error as { message: string };
  }
}
