import { Provider } from "../../models/index.js";
import { ResponseError } from "../../handlers/index.js";
import { existingProvider, sampleProvider, initialize } from "../util/index.js";
const moment = require("moment");

/*
Update the syntax in the unit tests
to account for jest's quirk when dealing with async functions
*/

/*
Add test to account for an invalid availabilites property
*/
describe("Should describe a provider", () => {
  beforeAll(async () => {
    await initialize();
  });

  test("Should return 200 if the provider's properties are valid", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    const response = await provider.validate();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the provider's first name is empty", async () => {
    let provider = new Provider(
      "",
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the provider's last name is empty", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      "",
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );

    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the provider's email is empty", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      "",
      sampleProvider.phone,
      sampleProvider.availabilties,
    );

    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the provider's email is invalid", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      "2312@",
      sampleProvider.phone,
      sampleProvider.availabilties,
    );

    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the provider's phone number is empty", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      "",
      sampleProvider.availabilties,
    );

    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the provider's phone number is invalid", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      "12312",
      sampleProvider.availabilties,
    );

    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 and create a new provider", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    const response = await provider.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
    expect(provider.id).toBeTruthy();
  });

  test("Should return 200 and store the provider's bookings", async () => {
    let provider = new Provider(
      existingProvider.firstName,
      existingProvider.lastName,
      existingProvider.email,
      existingProvider.phone,
      existingProvider.availabilties,
    );
    await provider.getId();
    let response = await provider.getBookingsByDate(
      moment().add(48, "hours").format("YYYY-MM-DD"),
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
    expect(provider.bookings.length).toBe(1);
  });

  test("Should return 200 and store the provider's bookings on a date", async () => {
    let provider = new Provider(
      existingProvider.firstName,
      existingProvider.lastName,
      existingProvider.email,
      existingProvider.phone,
      existingProvider.availabilties,
    );
    await provider.getId();
    let response = await provider.getBookingsByDate(
      moment().add(48, "hours").format("YYYY-MM-DD"),
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
    expect(provider.bookings.length).toBe(1);
  });

  test("Should return 200 and store the provider's availability on a date", async () => {
    let provider = new Provider(
      existingProvider.firstName,
      existingProvider.lastName,
      existingProvider.email,
      existingProvider.phone,
      existingProvider.availabilties,
    );
    await provider.getId();
    let response = await provider.getavailabilityByDate(
      moment().add(48, "hours").format("YYYY-MM-DD"),
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
    expect(provider.availableByDate).not.toBe({});
    console.log(provider.availableByDate);
    // lack of availabilites on a date is due to
  });
});

// not populating availabilites of existing providers
// monogdb is crashing

// need to add function for the booking class
// to validateProviderAvailability
// to validate startsAt is not already in use!
