import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

export default defineConfig({
  dialect: "sqlite",
  schema: ["src/lib/db/schema.ts"],
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: "./src/lib/db/sqlite.db",
  },
});
