import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";

// export const chatTable = sqliteTable("chat", {
//   id: text().primaryKey(),
//   title: text().notNull(),
//   createdAt: integer({ mode: "timestamp_ms" }),
// });

export const essayTable = pgTable("essay", {
  id: text().primaryKey(),
  title: text().notNull(),
  html: text().notNull(),
});

// export const messageTable = sqliteTable("message", {
//   id: text().primaryKey(),
//   chatId: text("chatId")
//     .notNull()
//     .references(() => chatTable.id),
//   role: text("role").notNull(),
//   content: blob({ mode: "json" }),
//   createdAt: integer({ mode: "timestamp_ms" }),
// });

// export type Message = InferSelectModel<typeof messageTable>;

export const userDataTable = pgTable("user_data", {
  id: text().primaryKey(),
  name: text().notNull(),
  friendDescriptions: text().notNull(),
  motivations: text().notNull(),
  challenges: text().notNull(),
  leadership: text().notNull(),
  extracurriculars: text().notNull(),
  seeYou: text().notNull(),
  storyStyle: text().notNull(),
  personalQualities: text().notNull(),
  futureImpact: text().notNull(),
  academicStrenght: text().notNull(),
  introduction: text().notNull(),
  keyMoments: text().notNull(),
  fiveSec: text().notNull(),
  digDeeper: text().notNull(),
});

export type UserData = InferSelectModel<typeof userDataTable>;
export type InsertUserData = InferInsertModel<typeof userDataTable>;
