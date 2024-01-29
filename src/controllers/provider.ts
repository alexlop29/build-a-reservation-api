import { ResponseError, Response } from "../handlers";
import { Provider } from "../models";
import { Availability } from "../types";

class ProviderController {
  constructor() {}

  // not a fan - should not need all of this information to retrieve
  // simple availability!
  async getProviderAvailabilityByDate(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    availabilities: Availability[],
    date: Date,
  ) {
    try {
      let provider = new Provider(
        firstName,
        lastName,
        email,
        phone,
        availabilities,
      );
      await provider.getId();
      await provider.getavailabilityByDate(date);
      return provider.availableByDate;
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
      let provider = new Provider(
        firstName,
        lastName,
        email,
        phone,
        availabilities,
      );
      await provider.validate();
      await provider.save();
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

export { ProviderController };
