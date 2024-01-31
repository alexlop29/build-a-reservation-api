import { ResponseError, Response } from "../handlers";
import { Booking } from "../models";

class BookingController {
  constructor() {}

  async createBooking(
    clientId: string,
    providerId: string,
    startsAt: Date,
    updatedAt: Date,
    status: string,
  ) {
    try {
      let booking = new Booking();
      await booking.init(clientId, providerId, startsAt, updatedAt, status);
      await booking.validateParams();
      await booking.validateStatus();
      await booking.validateTime();
      await booking.save();
      return new Response(200, "OK");
    } catch (error) {
      if (error instanceof ResponseError) {
        throw error;
      } else {
        throw new ResponseError(500, "Internal Server Error");
      }
    }
  }

  async confirmBooking(clientId: string, providerId: string, startsAt: Date) {
    try {
      let booking = new Booking();
      await booking.get(clientId, providerId, startsAt);
      await booking.confirm();
      return new Response(200, "OK");
    } catch (error) {
      if (error instanceof ResponseError) {
        throw error;
      } else {
        throw new ResponseError(500, "Internal Server Error");
      }
    }
  }
}

export { BookingController };
