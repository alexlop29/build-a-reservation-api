import * as dotenv from "dotenv";
dotenv.config();

export const SENTRY_DSN = process.env.SENTRY_DSN ?? "";
export const MONGO_DB_URI = process.env.MONGO_DB_URI ?? "";
