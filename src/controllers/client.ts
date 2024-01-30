import { ResponseError, Response } from "../handlers/index.js";
import { Client } from "../models/index.js";

class ClientController {
  constructor() {}

  async createClient(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  ) {
    try {
      let client = new Client(firstName, lastName, email, phone);
      await client.validate();
      await client.save();
      return new Response(200, "OK");
    } catch (error) {
      if (error instanceof ResponseError) {
        throw error;
      } else {
        throw new ResponseError(500, "Internal Server Error");
      }
    }
  }
}

export { ClientController };
