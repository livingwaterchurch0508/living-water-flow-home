import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const hymns = mysqlTable("hymns", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }),
  desc: varchar("desc", { length: 256 }),
  url: varchar("url", { length: 256 }),
  type: int("type").default(0),
  viewCount: int("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  nameEn: varchar("nameEn", { length: 512 }),
  descEn: varchar("descEn", { length: 512 }),
});

export const sermons = mysqlTable("sermons", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }),
  desc: varchar("desc", { length: 256 }),
  url: varchar("url", { length: 256 }),
  type: int("type").default(0),
  viewCount: int("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  nameEn: varchar("nameEn", { length: 512 }),
  descEn: varchar("descEn", { length: 512 }),
});

export const communities = mysqlTable("communities", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 256 }),
  desc: varchar("desc", { length: 256 }),
  type: int("type").default(1),
  url: varchar("url", { length: 256 }),
  viewCount: int("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  nameEn: varchar("nameEn", { length: 512 }),
  descEn: varchar("descEn", { length: 512 }),
});

export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  communityId: int("community_id").references(() => communities.id),
  url: varchar("url", { length: 256 }),
  caption: varchar("caption", { length: 256 }),
  downloadCount: int("downloadCount").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  captionEn: varchar("captionEn", { length: 512 }),
});
