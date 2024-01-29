import { sampleProvider } from "../util";
import { Provider } from "../../models";
import { initialize } from "../util";
import { ResponseError } from "../../handlers";

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
});

/*
Will need to seed the database with sample client, provider, bookings
left off testing getBookingsByDate
*/
