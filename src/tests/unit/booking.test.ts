import { Booking } from "../../models";
import { booking } from "../../database";
import { stub, SinonStub } from "sinon";
import { ResponseError } from "../../handlers";
const moment = require("moment");
import { sampleBooking } from "../util";

describe("Should describe a booking", () => {
  let mockValidate: SinonStub;
  let mockSave: SinonStub;
  // let mockFindOne: SinonStub;

  beforeEach(() => {
    mockValidate = stub(booking.prototype, "validate");
    mockSave = stub(booking.prototype, "save");
    // mockFindOne = stub(booking, "findOne");
  });

  afterEach(() => {
    mockValidate.restore();
    mockSave.restore();
    // mockFindOne.restore();
  });

  test("Should return 200, initalize the booking, and store provided properties", async () => {
    let booking = new Booking();
    let response = await booking.init(
      sampleBooking.clientId,
      sampleBooking.providerId,
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
      sampleBooking.clientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    mockValidate.resolves();
    const response = await booking.validateParams();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the booking's clientId is empty", async () => {
    let booking = new Booking();
    await booking.init(
      "",
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    mockValidate.rejects();
    await expect(booking.validateParams()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's providerId is empty", async () => {
    let booking = new Booking();
    await booking.init(
      sampleBooking.clientId,
      "",
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    mockValidate.rejects();
    await expect(booking.validateParams()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the booking's status is empty", async () => {
    let booking = new Booking();
    await booking.init(
      sampleBooking.clientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      "",
    );
    mockValidate.rejects();
    await expect(booking.validateParams()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 if the booking's status is valid", async () => {
    let booking = new Booking();
    await booking.init(
      sampleBooking.clientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      "CONFIRMED",
    );
    let response = await booking.validateStatus();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the booking's status is invalid", async () => {
    let booking = new Booking();
    await booking.init(
      sampleBooking.clientId,
      sampleBooking.providerId,
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
      sampleBooking.clientId,
      sampleBooking.providerId,
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
      sampleBooking.clientId,
      sampleBooking.providerId,
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
      sampleBooking.clientId,
      sampleBooking.providerId,
      moment(),
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    mockValidate.resolves();
    await booking.validateParams();
    await booking.validateStatus();
    await booking.validateTime();
    mockSave.resolves({
      _id: sampleBooking._id,
      clientId: sampleBooking.clientId,
      providerId: sampleBooking.providerId,
      startsAt: sampleBooking.startsAt,
      duration: sampleBooking.duration,
      updatedAt: sampleBooking.updatedAt,
      status: sampleBooking.status,
    });
    const response = await booking.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  // test("Should return 200, retrieve, and store a booking's information", async () => {
  //   let booking = new Booking();
  //   mockFindOne.resolves({
  //     _id: "231231231231231",
  //     clientId: sampleBooking.clientId,
  //     providerId: sampleBooking.providerId,
  //     startsAt: sampleBooking.startsAt,
  //     duration: sampleBooking.duration,
  //     updatedAt: sampleBooking.updatedAt,
  //     status: sampleBooking.status,
  //   });
  //   let response = await booking.get(
  //     sampleBooking.clientId,
  //     sampleBooking.providerId,
  //     sampleBooking.startsAt,
  //   );
  //   expect(response.status).toBe(200);
  //   expect(response.message).toBe("OK");
  // });

  // test("Should return 400 if unable to locate the booking", async () => {
  //   let booking = new Booking();
  //   mockFindOne.rejects();
  //   await expect(
  //     booking.get(
  //       "",
  //       sampleBooking.providerId,
  //       sampleBooking.startsAt,
  //     ),
  //   ).rejects.toThrow(new ResponseError(400, "Bad Request"));
  // });
});
