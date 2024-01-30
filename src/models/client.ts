import { client } from "../database";
import { Response, ResponseError } from "../handlers";
import { captureException } from "@sentry/node";

/**
 * Faciliates interactions with an individual client
 */
class Client {
  profile: any;

  constructor() {}

  /**
   * Stores the client's information
   *
   * @param firstName the client's first name
   * @param lastName the client's last name
   * @param email the provider's email
   * @param phone the provider's phone number
   * @returns Response(200, "OK") || ResponseError(500, "Internal Server Error")
   */
  async init(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
  ): Promise<Response | ResponseError> {
    try {
      this.profile = new client({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
      });
      return new Response(200, "OK");
    } catch (error) {
      captureException(error);
      throw new ResponseError(500, "Internal Server Error");
    }
  }

  /**
   * Validates the client's information
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
   * Saves the client's information
   * Should be called after init(), validate()
   *
   * @returns Response(200, "OK") || ResponseError(400, "Bad Request")
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
}

export { Client };
