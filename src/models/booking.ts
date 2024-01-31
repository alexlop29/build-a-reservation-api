import { booking } from "../database";
import { Response, ResponseError } from "../handlers";
import { isIn } from "validator";
const moment = require("moment");
import { captureException } from "@sentry/node";

/**
 * Faciliates interactions with an individual booking
 */
class Booking {
  booking: any;
  status: string = "";
  startsAt: Date | undefined;

  constructor() {}

  /**
   * Stores the booking information
   *
   * @param clientId the client's Id
   * @param providerId the provider's Id
   * @param startsAt the start time of the booking
   * @param updatedAt the last time the booking was updated
   * @param status the current status of the booking
   * @returns Response(200, "OK") || ResponseError(500, "Internal Server Error")
   */
  async init(
    clientId: string,
    providerId: string,
    startsAt: Date,
    updatedAt: Date,
    status: string,
  ): Promise<Response | ResponseError> {
    try {
      this.booking = new booking({
        clientId,
        providerId,
        startsAt,
        duration: 15,
        updatedAt,
        status,
      });
      this.status = status;
      this.startsAt = startsAt;
      return new Response(200, "OK");
    } catch (error) {
      captureException(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  /**
   * Validates the booking's information
   * Should be called after init()
   *
   * @returns Response(200, "OK") || ResponseError(400, "Bad Request")
   */
  async validateParams(): Promise<Response | ResponseError> {
    try {
      await this.booking?.validate();
      return new Response(200, "OK");
    } catch (error) {
      captureException(error);
      throw new ResponseError(400, "Bad Request");
    }
  }

  /**
   * Validates the booking's status
   * Should be called after init(), validateParams()
   *
   * @returns Response(200, "OK") || ResponseError(400, "Bad Request")
   */
  async validateStatus(): Promise<Response | ResponseError> {
    if (
      isIn(this.status, [
        "BOOKED",
        "CONFIRMED",
        "COMPLETE",
        "CANCELED",
        "INCOMPLETE",
      ])
    ) {
      return new Response(200, "OK");
    } else {
      throw new ResponseError(400, "Bad Request");
    }
  }

  /**
   * Validates the booking's startsAt time is at least 24 hours in advance
   * Should be called after init(), validateParams(), validateStatus()
   *
   * @returns Response(200, "OK") || ResponseError(400, "Bad Request")
   */
  async validateTime(): Promise<Response | ResponseError> {
    if (moment(this.startsAt).isAfter(moment().add("h", 24))) {
      return new Response(200, "OK");
    } else {
      throw new ResponseError(400, "Bad Request");
    }
  }

  /*
    NOTE: (alopez) Implement a function to validate the provider's
    availabilty at the startsAt time. 
  */

  /**
   * Saves the booking information
   * Should be called after init(), validateParams(), validateStatus(), validateTime()
   *
   * @returns Response(200, "OK") || ResponseError(500, "Internal Server Error")
   */
  async save(): Promise<Response | ResponseError> {
    try {
      await this.booking?.save();
      return new Response(200, "OK");
    } catch (error: any) {
      captureException(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  /**
   * Retrieves and stores the booking information
   * @param clientId the client's Id
   * @param providerId the provider's Id
   * @param startsAt the start time of the booking
   *
   * @returns Response(200, "OK") || ResponseError(400, "Bad Request")
   */
  async get(
    clientId: string,
    providerId: string,
    startsAt: Date,
  ): Promise<Response | ResponseError> {
    try {
      let response = await booking
        .findOne({
          clientId,
          providerId,
          startsAt,
        })
        .orFail();
      this.booking = response;
      return new Response(200, "OK");
    } catch (error: any) {
      captureException(error);
      throw new ResponseError(400, "Bad Request");
    }
  }

  /**
   * Confirms a booking
   * Should be called after get()
   *
   * @returns Response(200, "OK") || ResponseError(500, "Internal Server Error")
   */
  async confirm(): Promise<Response | ResponseError> {
    try {
      await booking.updateOne(
        { _id: this.booking.id },
        { status: "CONFIRMED" },
      );
      return new Response(200, "OK");
    } catch (error: any) {
      captureException(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { Booking };
