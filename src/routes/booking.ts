// import { Router, json } from "express";
// import { BookingController } from "../controllers/booking";
// import { ResponseError } from "../handlers";

// const bookingController = new BookingController();

// const bookingRoute = Router();
// bookingRoute.use(json());

// bookingRoute.post("/confirm", async (req, res) => {
//   try {
//     await bookingController.confirmBooking(
//       req.body.clientId,
//       req.body.providerId,
//       req.body.startsAt,
//       req.body.updatedAt,
//       req.body.status,
//     );
//     return res.status(200);
//   } catch (error) {
//     if (error instanceof ResponseError) {
//       return res.status(error.status);
//     } else {
//       return res.status(500);
//     }
//   }
// });

// bookingRoute.post("/", async (req, res) => {
//   try {
//     await bookingController.createBooking(
//       req.body.clientId,
//       req.body.providerId,
//       req.body.startsAt,
//       req.body.updatedAt,
//       req.body.status,
//     );
//     return res.status(200);
//   } catch (error) {
//     if (error instanceof ResponseError) {
//       return res.status(error.status);
//     } else {
//       return res.status(500);
//     }
//   }
// });

// export { bookingRoute };
