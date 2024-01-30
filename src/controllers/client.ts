import { ResponseError, Response } from "../handlers";
import { Client } from "../models";
import { captureException } from "@sentry/node";

class ClientController {
  constructor() {}

  async createClient(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  ): Promise<Response | ResponseError> {
    try {
      let client = new Client();
      await client.init(firstName, lastName, email, phone);
      await client.validate();
      await client.save();
      return new Response(200, "OK");
    } catch (error) {
      captureException(error);
      if (error instanceof ResponseError) {
        throw error;
      } else {
        throw new ResponseError(500, "Internal Server Error");
      }
    }
  }
}

export { ClientController };
