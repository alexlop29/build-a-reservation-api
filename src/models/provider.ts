import { provider, booking } from "../database";
import { ResponseError, Response } from "../handlers";
import { Availability, Booking } from "../types";
import { getWeekDay } from "../helpers";
const moment = require("moment");
import { captureException } from "@sentry/node";

/**
 * Faciliates interactions with an individual provider
 */
class Provider {
  profile: any;
  availablityByDate = {};
  bookingsByDate: Booking[] = [];

  constructor() {}

  /**
   * Stores the provider's information
   *
   * @param firstName the provider's first name
   * @param lastName the provider's last name
   * @param email the provider's email
   * @param phone the provider's phone number
   * @param availabilties the provider's availabiltiy on a weekly basis
   * @returns Response(200, "OK") || ResponseError(500, "Internal Server Error")
   */
  async init(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    availabilities: Availability[],
  ): Promise<Response | ResponseError> {
    try {
      this.profile = new provider({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        availabilities: availabilities,
      });
      return new Response(200, "OK");
    } catch (error) {
      captureException(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  /**
   * Validates the provider's information
   * Should be called after init()
   *
   * @returns Response(200, "OK") || ResponseError(400, "Bad Request")
   */
  async validate(): Promise<Response | ResponseError> {
    try {
      await this.profile?.validate();
      return new Response(200, "OK");
    } catch (error: any) {
      captureException(error);
      throw new ResponseError(400, "Bad Request");
    }
  }

  /**
   * Saves the provider's information
   * Should be called after init(), validate()
   *
   * @returns Response(200, "OK") || ResponseError(500, "Internal Server Error")
   */
  async save(): Promise<Response | ResponseError> {
    try {
      await this.profile?.save();
      return new Response(200, "OK");
    } catch (error: any) {
      captureException(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  /**
   * Retrieves and stores the provider's profile
   * @param email the provider's email
   *
   * @returns Response(200, "OK") || ResponseError(400, "Bad Request")
   */
  async get(email: string): Promise<Response | ResponseError> {
    try {
      let response = await provider
        .findOne({
          email: email,
        })
        .orFail();
      this.profile = response;
      return new Response(200, "OK");
    } catch (error) {
      captureException(error);
      throw new ResponseError(400, "Bad Request");
    }
  }

  /**
   * Retrieves and stores the provider's bookings on a specific date
   * Should be called after get()
   * @param date the provider's email
   *
   * @returns Response(200, "OK") || ResponseError(500, "Internal Server Error")
   */
  async getBookingsByDate(date: Date): Promise<Response | ResponseError> {
    try {
      const startOfDay = moment(date).startOf("day").toISOString();
      const endOfDay = moment(date).endOf("day").toISOString();
      let bookings = await booking.find({
        providerId: this.profile._id,
        startsAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });
      this.bookingsByDate = bookings;
      return new Response(200, "OK");
    } catch (error) {
      captureException(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  /**
   * Retrieves and stores the provider's availability on a specific date
   * Should be called after get(), getBookingsByDate()
   * @param date the provider's email
   *
   * @returns Response(200, "OK") || ResponseError(500, "Internal Server Error")
   */
  async getAvailabilityByDate(date: Date): Promise<Response | ResponseError> {
    try {
      let weekDay = getWeekDay(date);
      let availabilityOnDayOfTheWeek = this.profile.availabilities.find(
        (availability: Availability) => availability.weekDay === weekDay,
      );
      this.availablityByDate = {
        day: moment(date).format("YYYY-MM-DD"),
        availability: {
          startsAt: availabilityOnDayOfTheWeek.startAt,
          endsAt: availabilityOnDayOfTheWeek.endsAt,
        },
        booked: this.bookingsByDate,
      };
      return new Response(200, "OK");
    } catch (error) {
      captureException(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}
export { Provider };
