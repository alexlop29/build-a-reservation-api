import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import { SENTRY_DSN } from "./config/environment";
import { providerRoute, clientRoute, bookingRoute } from "./routes";
import { Server } from "http";
import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter.js";
import { ExpressAdapter } from "@bull-board/express";
import { Bookings, addJob } from "./jobs/restoreCalendarAvailability";

/*
Initalizes the application
*/
const app = express();

/*
Configures Sentry
*/
Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
});
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());
app.use(function onError(
  _err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  res.statusCode = 500;
  res.end("\n");
});

/*
Configures BullMQ
*/
const serverAdapter = new ExpressAdapter();
createBullBoard({
  queues: [new BullMQAdapter(Bookings)],
  serverAdapter: serverAdapter,
});
serverAdapter.setBasePath("/bullmq");
app.use("/bullmq", serverAdapter.getRouter());
const expireBookingsJob = {
  name: "expireBookings",
};
addJob(expireBookingsJob);

/*
Enables routes
*/
app.use("/provider", providerRoute);
app.use("/client", clientRoute);
app.use("/booking", bookingRoute);

/*
Handles starting and stopping the application
*/
const server: Server = app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

export { app, server };
