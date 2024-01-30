import { initialize } from "../util";
import { Provider } from "../../models";
import { sampleProvider, existingProvider } from "../util";
import { ResponseError } from "../../handlers";
const moment = require("moment");

describe("Should describe a provider", () => {
  beforeAll(async () => {
    await initialize();
  });

  test("Should return 200, initalize the provider, and store provided properties", async () => {
    let provider = new Provider();
    let response = await provider.init(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 200 if the provider's properties are valid", async () => {
    let provider = new Provider();
    await provider.init(
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
    let provider = new Provider();
    await provider.init(
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
    let provider = new Provider();
    await provider.init(
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
    let provider = new Provider();
    await provider.init(
      sampleProvider.firstName,
      sampleProvider.firstName,
      "",
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the provider's email is invalid", async () => {
    let provider = new Provider();
    await provider.init(
      sampleProvider.firstName,
      sampleProvider.firstName,
      "2dsadas@",
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the email address is already in use", async () => {
    let provider = new Provider();
    await provider.init(
      sampleProvider.firstName,
      sampleProvider.firstName,
      existingProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the provider's phone number is empty", async () => {
    let provider = new Provider();
    await provider.init(
      sampleProvider.firstName,
      sampleProvider.firstName,
      sampleProvider.email,
      "",
      sampleProvider.availabilties,
    );
    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the provider's phone number is invalid", async () => {
    let provider = new Provider();
    await provider.init(
      sampleProvider.firstName,
      sampleProvider.firstName,
      sampleProvider.email,
      "9089",
      sampleProvider.availabilties,
    );
    await expect(provider.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 and create a new provider", async () => {
    let provider = new Provider();
    await provider.init(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    await provider.validate();
    const response = await provider.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});

test("Should return 200, retrieve, and store a provider's profile", async () => {
  let provider = new Provider();
  let response = await provider.get(existingProvider.email);
  expect(response.status).toBe(200);
  expect(response.message).toBe("OK");
});

test("Should return 400 if the provider does not exist", async () => {
  let provider = new Provider();
  await expect(provider.get("pingpong@gmai.com")).rejects.toThrow(
    new ResponseError(400, "Bad Request"),
  );
});

test("Should return 200, retrieve, and store a provider's bookings by date", async () => {
  let provider = new Provider();
  await provider.get(existingProvider.email);
  let response = await provider.getBookingsByDate(
    moment().format("YYYY-MM-DD"),
  );
  expect(response.status).toBe(200);
  expect(response.message).toBe("OK");
});

test("Should return 200, retrieve, and store a provider's availability on a specific date", async () => {
  let provider = new Provider();
  await provider.get(existingProvider.email);
  await provider.getBookingsByDate(moment().format("YYYY-MM-DD"));
  let response = await provider.getAvailabilityByDate(
    moment().format("YYYY-MM-DD"),
  );
  expect(response.status).toBe(200);
  expect(response.message).toBe("OK");
});
