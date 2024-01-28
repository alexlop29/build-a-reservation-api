import * as dotenv from "dotenv";
dotenv.config();

export const SENTRY_DSN = process.env.SENTRY_DSN ?? "";
export const MONGO_DB_URI = process.env.MONGO_DB_URI ?? "";
export const REDIS_URL = process.env.REDIS_URL ?? "";
export const REDIS_HOST = process.env.REDIS_HOST ?? "";
export const REDIS_PORT = Number(process.env.REDIS_PORT) ?? 6379;
