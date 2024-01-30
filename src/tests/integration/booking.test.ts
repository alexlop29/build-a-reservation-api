import { Booking } from "../../models";
import {
  sampleBooking,
  initialize,
  validClientId,
  validProviderId,
} from "../util/";
import { ResponseError } from "../../handlers/";
const moment = require("moment");

describe("Should describe a booking", () => {
  beforeAll(async () => {
    await initialize();
  });

  // failing because the client and provider do not exist
  // good test case to add, e.g. invalid client and providerid!
  test("Should return 200 if the booking's properties are valid", async () => {
    let booking = new Booking(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    const response = await booking.validate();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the booking's clientId is empty", async () => {
    let booking = new Booking(
      "",
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );

    await expect(booking.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's clientId does not exist", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    await expect(booking.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's providerId is empty", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      "",
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );

    await expect(booking.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's providerId does not exist", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );

    await expect(booking.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's status is empty", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      "",
    );
    await expect(booking.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's status is not an expected value", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      "VERIFY",
    );
    await expect(booking.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking is less than 24hrs from now", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      sampleBooking.providerId,
      moment(),
      sampleBooking.updatedAt,
      sampleBooking.status,
    );

    await expect(booking.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 and create a new booking", async () => {
    let booking = new Booking(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    const response = await booking.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});
