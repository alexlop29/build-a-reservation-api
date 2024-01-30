import * as Sentry from "@sentry/node";
import { ProfilingIntegration } from "@sentry/profiling-node";
import express from "express";
import { SENTRY_DSN } from "./config/environment.js";
// import { bookingRoute, providerRoute, clientRoute } from "./routes/";
import { providerRoute } from "./routes/provider.js";
import { Server } from "http";

const app = express();

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }),
    new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

// All your controllers should live here
app.get("/", function rootHandler(_req, res) {
  res.end("Hello world!");
});

app.get("/debug-sentry", function mainHandler(_req, _res) {
  throw new Error("My first Sentry error!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// // Optional fallthrough error handler
app.use(function onError(
  _err: Error,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction,
) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end("\n");
});

app.use("/provider", providerRoute);
// app.use("/client", clientRoute);
// app.use("/booking", bookingRoute);

const server: Server = app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("HTTP server closed");
  });
});

export { server };
