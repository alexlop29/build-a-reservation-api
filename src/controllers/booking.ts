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
      let booking = new Booking(
        clientId,
        providerId,
        startsAt,
        updatedAt,
        status,
      );
      await booking.validate();
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

  // not a fan of this implementation
  // should be able to confirm booking with the booking id.
  // do not need all of this information.
  // restrucutre classes to ask for parameters on the fucntion level(?)
  // as opposed ot the object level!
  // should also validate the existence of hte bookign first!
  async confirmBooking(
    clientId: string,
    providerId: string,
    startsAt: Date,
    updatedAt: Date,
    status: string,
  ) {
    try {
      let booking = new Booking(
        clientId,
        providerId,
        startsAt,
        updatedAt,
        status,
      );
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
