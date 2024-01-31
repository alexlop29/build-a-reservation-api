import { Router, json } from "express";
import { BookingController } from "../controllers/booking";
import { ResponseError } from "../handlers";

const bookingController = new BookingController();

const bookingRoute = Router();
bookingRoute.use(json());

bookingRoute.post("/", async (req, res) => {
  try {
    await bookingController.createBooking(
      req.body.clientId,
      req.body.providerId,
      req.body.startsAt,
      req.body.updatedAt,
      req.body.status,
    );
    res.status(200).json({
      status: 200,
      message: "OK",
    });
  } catch (error) {
    if (error instanceof ResponseError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
});

bookingRoute.post("/confirm", async (req, res) => {
  try {
    await bookingController.confirmBooking(
      req.body.clientId,
      req.body.providerId,
      req.body.startsAt,
    );
    res.status(200).json({
      status: 200,
      message: "OK",
    });
  } catch (error) {
    if (error instanceof ResponseError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
});

export { bookingRoute };
