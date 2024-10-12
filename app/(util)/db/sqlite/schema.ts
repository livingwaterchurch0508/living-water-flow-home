import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const hymns = sqliteTable("hymns", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
  desc: text("desc", { length: 256 }),
  url: text("url", { length: 256 }),
  type: integer("type").default(0),
  viewCount: integer("viewCount").default(0),
  createdAt: text("createdAt").default(sql`(current_timestamp)`),
  nameEn: text("nameEn", { length: 512 }),
  descEn: text("descEn", { length: 512 }),
});

export const sermons = sqliteTable("sermons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
  desc: text("desc", { length: 256 }),
  url: text("url", { length: 256 }),
  type: integer("type").default(0),
  viewCount: integer("viewCount").default(0),
  createdAt: text("createdAt").default(sql`(current_timestamp)`),
  nameEn: text("nameEn", { length: 512 }),
  descEn: text("descEn", { length: 512 }),
});

export const communities = sqliteTable("communities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }),
  desc: text("desc", { length: 256 }),
  type: integer("type").default(1),
  url: text("url", { length: 256 }),
  viewCount: integer("viewCount").default(0),
  createdAt: text("createdAt").default(sql`(current_timestamp)`),
  nameEn: text("nameEn", { length: 512 }),
  descEn: text("descEn", { length: 512 }),
});

export const files = sqliteTable("files", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  communityId: integer("community_id").references(() => communities.id),
  url: text("url", { length: 256 }),
  caption: text("caption", { length: 256 }),
  downloadCount: integer("downloadCount").default(0),
  createdAt: text("createdAt").default(sql`(current_timestamp)`),
  captionEn: text("captionEn", { length: 512 }),
});
