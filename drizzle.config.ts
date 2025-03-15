import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });



export default defineConfig({
  dialect: "postgresql",
  schema: ["src/lib/db/schema.ts"],
  out: "./src/lib/db/migrations",
  dbCredentials: {
    url: process.env.POSTGRES_URL_NO_SSL!,
  },
});
