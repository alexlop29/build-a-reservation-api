import { provider } from "../database/";
import { ResponseError, Response } from "../handlers/";
import { booking } from "../database/";
import { Availability, Booking } from "../types/";
import { getWeekDay } from "../helpers";
const moment = require("moment");

// The 15min time slots can be hanlded by the Booking Controller
class Provider {
  profile;
  id: string = "";
  availableByDate = {};
  bookings: Booking[] = [];

  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly availabilities: Availability[],
  ) {
    this.profile = new provider({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      availabilities: this.availabilities,
    });
  }
  // can not test until the integration test
  // forced to resolve desired dict
  // may not have booking on date
  // need to account for the user asking for a day in which the provider is not available
  async getavailabilityByDate(at: Date): Promise<Response | ResponseError> {
    try {
      this.getBookingsByDate(at);
      let weekDay = getWeekDay(at);
      let availabilityOnDayOfTheWeek = this.availabilities.find(
        (availability) => availability.weekDay === weekDay,
      );
      let avail = `${moment(availabilityOnDayOfTheWeek?.startAt).format("HH:MM")}-${moment(availabilityOnDayOfTheWeek?.endAt).format("HH:MM")}`;
      // may want to format bookings better!

      this.availableByDate = {
        day: moment(at).format("YYYY-MM-DD"),
        availability: avail,
        booked: this.bookings,
      };
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  async getBookingsByDate(at: Date): Promise<Response | ResponseError> {
    try {
      let bookings = await booking.find({
        providerId: this.id,
        startsAt: new RegExp(`^${at}`),
      });
      this.bookings = bookings;
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  async validate(): Promise<Response | ResponseError> {
    try {
      await this.profile?.validate();
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(400, "Bad Request");
    }
  }

  async save(): Promise<Response | ResponseError> {
    try {
      let provider = await this.profile?.save();
      this.id = provider._id;
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { Provider };
