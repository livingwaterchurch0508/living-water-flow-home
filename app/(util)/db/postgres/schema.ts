import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const hymns = pgTable("hymns", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  name: varchar("name", { length: 256 }),
  desc: varchar("desc", { length: 256 }),
  url: varchar("url", { length: 256 }),
  type: integer("type").default(0),
  viewCount: integer("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  nameEn: varchar("nameEn", { length: 512 }),
  descEn: varchar("descEn", { length: 512 }),
});

export const sermons = pgTable("sermons", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  name: varchar("name", { length: 256 }),
  desc: varchar("desc", { length: 256 }),
  url: varchar("url", { length: 256 }),
  type: integer("type").default(0),
  viewCount: integer("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  nameEn: varchar("nameEn", { length: 512 }),
  descEn: varchar("descEn", { length: 512 }),
});

export const communities = pgTable("communities", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  name: varchar("name", { length: 256 }),
  desc: varchar("desc", { length: 256 }),
  type: integer("type").default(1),
  url: varchar("url", { length: 256 }),
  viewCount: integer("viewCount").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  nameEn: varchar("nameEn", { length: 512 }),
  descEn: varchar("descEn", { length: 512 }),
});

export const files = pgTable("files", {
  id: integer("id").generatedAlwaysAsIdentity().primaryKey(),
  communityId: integer("community_id").references(() => communities.id),
  url: varchar("url", { length: 256 }),
  caption: varchar("caption", { length: 256 }),
  downloadCount: integer("downloadCount").default(0),
  createdAt: timestamp("createdAt").defaultNow(),
  captionEn: varchar("captionEn", { length: 512 }),
});
