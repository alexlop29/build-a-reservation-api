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

  // need to create unit test for
  // need to account for what if the id does yet exist
  async getId(): Promise<Response | ResponseError> {
    try {
      let existingProvider = await provider.findOne({
        email: this.email,
      });
      this.id = existingProvider._id;
      return new Response(200, "OK");
    } catch (error) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  // can not test until the integration test
  // forced to resolve desired dict
  // may not have booking on date
  // need to account for the user asking for a day in which the provider is not available
  // need to create more granular tests and split
  // function has too many jobs!
  async getavailabilityByDate(at: Date): Promise<Response | ResponseError> {
    try {
      this.getBookingsByDate(at);
      let weekDay = getWeekDay(at);
      let availabilityOnDayOfTheWeek = this.availabilities.find(
        (availability) => availability.weekDay === weekDay,
      );
      console.log(availabilityOnDayOfTheWeek);
      let avail = `${availabilityOnDayOfTheWeek?.startAt}-${availabilityOnDayOfTheWeek?.endAt}`;
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

  // need to use providerId, not email
  // create function to retrieve providerId
  // there may be an error here; showing up in getAvailabilityByDate();
  async getBookingsByDate(at: Date): Promise<Response | ResponseError> {
    try {
      const startOfDay = moment(at).startOf("day").toISOString();
      const endOfDay = moment(at).endOf("day").toISOString();
      let bookings = await booking.find({
        providerId: this.id,
        startsAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
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
