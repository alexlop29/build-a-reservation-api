import { provider } from "../database/";
import { ResponseError, Response } from "../handlers/";
import { booking } from "../database/";
import { getTimeSlots } from "../helpers/";
import { Booking } from "../types/";
import { Availability } from "../types/";

// The 15min time slots can be hanlded by the Booking Controller
class Provider {
  profile;
  id: string = "";
  availableSlots: string[] = [];

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

  async availability(): Promise<Response | ResponseError> {
    try {
      let bookings = await booking.find({ providerId: this.id });
      let timeSlots = await getTimeSlots();
      bookings.forEach((booking: Booking) => {
        let index = timeSlots.indexOf(String(booking.startsAt));
        timeSlots.splice(index, 1);
      });
      this.availableSlots = timeSlots;
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
