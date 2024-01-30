import { ResponseError, Response } from "../handlers";
import { Provider } from "../models";
import { Availability } from "../types";
import { captureException } from "@sentry/node";

class ProviderController {
  constructor() {}

  async getProviderAvailabilityByDate(email: string, date: Date) {
    try {
      let provider = new Provider();
      await provider.get(email);
      await provider.getBookingsByDate(date);
      return provider.getAvailabilityByDate(date);
    } catch (error) {
      if (error instanceof ResponseError) {
        throw error;
      } else {
        throw new ResponseError(500, "Internal Server Error");
      }
    }
  }

  async createProvider(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    availabilities: Availability[],
  ): Promise<Response | ResponseError> {
    try {
      let provider = new Provider();
      await provider.init(firstName, lastName, email, phone, availabilities);
      await provider.validate();
      await provider.save();
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

export { ProviderController };
