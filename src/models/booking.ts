import { Schema } from "mongoose";
import { booking } from "../database/index.js";
import { Response, ResponseError } from "../handlers/index.js";
import { isIn } from "validator";
const moment = require("moment");

// Need an easy way to retrieve the booking
class Booking {
  booking;
  id: string = "";

  constructor(
    private readonly clientId: Schema.Types.ObjectId,
    private readonly providerId: Schema.Types.ObjectId,
    private readonly startsAt: Date,
    private readonly updatedAt: Date,
    private readonly status: string,
  ) {
    this.booking = new booking({
      clientId: this.clientId,
      providerId: this.providerId,
      startsAt: this.startsAt,
      duration: 15,
      updatedAt: this.updatedAt,
      status: this.status,
    });
  }

  async confirm(): Promise<Response | ResponseError> {
    try {
      booking.update({ _id: this.id }, { status: "CONFIRMED" });
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(400, "Bad Request");
    }
  }

  async validate(): Promise<Response | ResponseError> {
    try {
      await this.booking?.validate();
      isIn(this.status, [
        "BOOKED",
        "CONFIRMED",
        "COMPLETE",
        "CANCELED",
        "INCOMPLETE",
      ]);
      this.validateTime();
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(400, "Bad Request");
    }
  }

  private async validateTime(): Promise<Response | ResponseError> {
    if (moment(this.startsAt).isAfter(moment().add("h", 24))) {
      return new Response(200, "OK");
    } else {
      throw new ResponseError(400, "Bad Request");
    }
  }

  async save(): Promise<Response | ResponseError> {
    try {
      let booking = await this.booking?.save();
      this.id = booking._id;
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { Booking };