import { Router, json } from "express";

const bookingRoute = Router();
bookingRoute.use(json());

bookingRoute.post("/", async (_req, _res) => {});

export { bookingRoute };
