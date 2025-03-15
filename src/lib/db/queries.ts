import "server-only";

import { eq } from "drizzle-orm";

import { drizzle } from "drizzle-orm/better-sqlite3";
import { essayTable, userDataTable } from "./schema";

// import {
//   user,
//   chat,
//   type User,
//   document,
//   type Suggestion,
//   suggestion,
//   type Message,
//   message,
//   vote,
// } from "./schema";
// import { ArtifactKind } from "@/components/artifact";

// Optionally, if not using email/pass login, you can
// use the Drizzle adapter for Auth.js / NextAuth
// https://authjs.dev/reference/adapter/drizzle

// biome-ignore lint: Forbidden non-null assertion.

export const db = drizzle(import.meta.url);

export async function getUserData() {
  try {
    const [userData] = await db.select().from(userDataTable);
    return userData;
  } catch (error) {
    console.error("Failed to get user from database");
    throw error;
  }
}

// export async function saveChat({ id, title }: { id: string; title: string }) {
//   try {
//     return await db.insert(chatTable).values({
//       id,
//       createdAt: new Date(),
//       title,
//     });
//   } catch (error) {
//     console.error("Failed to save chat in database");
//     throw error;
//   }
// }

// export async function getChatById({ id }: { id: string }) {
//   try {
//     const [selectedChat] = await db
//       .select()
//       .from(chatTable)
//       .where(eq(chatTable.id, id));
//     return selectedChat;
//   } catch (error) {
//     console.error("Failed to get chat by id from database");
//     throw error;
//   }
// }

// export async function saveMessages({ messages }: { messages: Array<Message> }) {
//   try {
//     return await db.insert(messageTable).values(messages);
//   } catch (error) {
//     console.error("Failed to save messages in database", error);
//     throw error;
//   }
// }

// export async function getMessagesByChatId({ id }: { id: string }) {
//   try {
//     return await db
//       .select()
//       .from(messageTable)
//       .where(eq(messageTable.chatId, id))
//       .orderBy(asc(messageTable.createdAt));
//   } catch (error) {
//     console.error("Failed to get messages by chat id from database", error);
//     throw error;
//   }
// }

export async function saveEssay({
  id,
  title,
  html,
}: {
  id: string;
  title: string;
  html: string;
}) {
  try {
    return await db.insert(essayTable).values({
      id,
      title,
      html,
    });
  } catch (error) {
    console.error("Failed to save document in database");
    throw error;
  }
}

export async function getEssayById({ id }: { id: string }) {
  try {
    const [essay] = await db
      .select()
      .from(essayTable)
      .where(eq(essayTable.id, id));
    return essay;
  } catch (error) {
    console.error("Failed to get document by id from database");
    throw error;
  }
}
