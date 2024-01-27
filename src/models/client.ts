import { client } from "../database/index.js";
import { Response, ResponseError } from "../handlers/index.js";

class Client {
  profile;

  constructor(
    private readonly firstName: string | undefined,
    private readonly lastName: string | undefined,
    private readonly phone: string | undefined,
    private readonly email: string | undefined,
  ) {
    this.profile = new client({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
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
