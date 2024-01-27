import { Schema } from "mongoose";
import { booking } from "../database/index.js";
import { Response, ResponseError } from "../handlers/index.js";
import { isIn } from "validator";

class Booking {
  booking;

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
      updatedAt: this.updatedAt,
      status: this.status,
    });
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
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(400, "Bad Request");
    }
  }

  async create() {}

  async update() {}
}

export { Booking };
