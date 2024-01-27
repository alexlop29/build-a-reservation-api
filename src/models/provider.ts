import { availability, provider } from "../database/index.js";
import { ResponseError, Response } from "../handlers/index.js";

// The 15min time slots can be hanlded by the Booking Controller
class Provider {
  profile;

  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly availabilities: (typeof availability)[],
  ) {
    this.profile = new provider({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      availabilities: this.availabilities,
    });
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
      await this.profile?.save();
      return new Response(200, "OK");
    } catch (error: any) {
      throw new ResponseError(500, "Internal Server Error");
    }
  }
}

export { Provider };
