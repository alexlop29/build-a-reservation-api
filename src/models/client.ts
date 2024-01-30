import { client } from "../database/index.js";
import { Response, ResponseError } from "../handlers/index.js";

class Client {
  profile;

  constructor(
    private readonly firstName: string,
    private readonly lastName: string,
    private readonly email: string,
    private readonly phone: string,
  ) {
    this.profile = new client({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    });
  }

  /*
  Add function get all bookings for a client
  Future Improvement: Filter by Active Bookings, Pagination
  */
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

export { Client };
