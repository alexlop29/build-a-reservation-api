import { Booking } from "../../models";
import { booking } from "../../database";
import { stub, SinonStub } from "sinon";
import { ResponseError } from "../../handlers";
const moment = require("moment");

describe("Should describe a booking", () => {
  let sampleBooking = {
    _id: "23123123124133",
    clientId: "231231231231",
    providerId: "31231231231231231",
    startsAt: moment().add(48, "hours"),
    duration: 15,
    updatedAt: moment(),
    status: "BOOKED",
  };
  let mockValidate: SinonStub;
  let mockSave: SinonStub;
  let mockUpdate: SinonStub;

  beforeEach(() => {
    mockValidate = stub(booking.prototype, "validate");
    mockSave = stub(booking.prototype, "save");
    mockUpdate = stub(booking.prototype, "update");
  });

  afterEach(() => {
    mockValidate.restore();
    mockSave.restore();
    mockUpdate.restore();
  });

  test("Should return 200 if the booking's properties are valid", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      sampleBooking.providerId,
      sampleBooking.startsAt,
      sampleBooking.updatedAt,
      sampleBooking.status,
    );
    mockValidate.resolves();
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
    mockValidate.rejects();

    expect(booking.validate()).rejects.toThrow(
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
    mockValidate.rejects();

    expect(booking.validate()).rejects.toThrow(
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
    mockValidate.rejects();

    expect(booking.validate()).rejects.toThrow(
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

    mockValidate.rejects();

    expect(booking.validateTime()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 and create a new booking", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      sampleBooking.providerId,
      moment(),
      sampleBooking.updatedAt,
      sampleBooking.status,
    );

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

  test("Should return 200 and confirm the booking", async () => {
    let booking = new Booking(
      sampleBooking.clientId,
      sampleBooking.providerId,
      moment(),
      sampleBooking.updatedAt,
      sampleBooking.status,
    );

    mockUpdate.resolves({
      _id: sampleBooking._id,
      clientId: sampleBooking.clientId,
      providerId: sampleBooking.providerId,
      startsAt: sampleBooking.startsAt,
      duration: sampleBooking.duration,
      updatedAt: sampleBooking.updatedAt,
      status: "CONFIRMED",
    });

    const response = await booking.confirm();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});
