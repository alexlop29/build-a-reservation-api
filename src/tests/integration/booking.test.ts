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

  test("Should return 200, initalize the booking, and store provided properties", async () => {
    let booking = new Booking();
    let response = await booking.init(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 200 if the booking's parameters are valid", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    const response = await booking.validateParams();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the booking's clientId is empty", async () => {
    let booking = new Booking();
    await booking.init(
      "",
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    await expect(booking.validateParams()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's clientId does not exist", async () => {
    let booking = new Booking();
    await booking.init(
      sampleBooking.clientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    await expect(booking.validateParams()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's providerId is empty", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      "",
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    await expect(booking.validateParams()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's providerId does not exist", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    await expect(booking.validateParams()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's status is empty", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      "",
    );
    await expect(booking.validateParams()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 if the booking's status is valid", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      "CONFIRMED",
    );
    let response = await booking.validateStatus();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the booking's status is not an expected value", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      "BLOCKED",
    );
    await expect(booking.validateStatus()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 if the booking is at least 24hrs in advance", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    let response = await booking.validateTime();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the booking is not at least 24hrs in advance", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      validProviderId,
      moment(),
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    await expect(booking.validateTime()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 and create a new booking", async () => {
    let booking = new Booking();
    await booking.init(
      validClientId,
      validProviderId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    await booking.validateParams();
    await booking.validateStatus();
    await booking.validateTime();
    const response = await booking.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});
