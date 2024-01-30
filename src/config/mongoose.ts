import { ResponseError } from "../handlers";
import { MONGO_DB_URI } from "./environment";
const mongoose = require("mongoose");
import { captureException } from "@sentry/node";

/*
NOTE: (alopez) To improve application readiness and health checks,
leverage Event Emitters to send a signal
to the application once the database is ready to accept connections.
*/
try {
  mongoose.connect(MONGO_DB_URI, {
    maxPoolSize: 10,
    minPoolSize: 5,
  });
} catch (error) {
  captureException(new ResponseError(500, "Internal Server Error"));
}

export { mongoose };
