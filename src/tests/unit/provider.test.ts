import { provider, booking } from "../../database/";
import { Provider } from "../../models/";
const moment = require("moment");
import { stub, SinonStub } from "sinon";
import { ResponseError } from "../../handlers";
import { sampleProvider } from "../util";

/*
Need to normalize the weekday
*/

/*
Need to add a validation test to check the uniqueness
of the email!
*/

describe("Should describe a provider", () => {
  let mockSave: SinonStub;
  let mockValidate: SinonStub;
  let mockFind: SinonStub;

  beforeEach(() => {
    mockSave = stub(provider.prototype, "save");
    mockValidate = stub(provider.prototype, "validate");
    mockFind = stub(booking, "find");
  });

  afterEach(() => {
    mockSave.restore();
    mockValidate.restore();
    mockFind.restore();
  });

  test("Should return 200 if the provider's properties are valid", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    mockValidate.resolves();
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
    mockValidate.rejects();

    expect(provider.validate()).rejects.toThrow(
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
    mockValidate.rejects();

    expect(provider.validate()).rejects.toThrow(
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
    mockValidate.rejects();

    expect(provider.validate()).rejects.toThrow(
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
    mockValidate.rejects();

    expect(provider.validate()).rejects.toThrow(
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
    mockValidate.rejects();

    expect(provider.validate()).rejects.toThrow(
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
    mockValidate.rejects();

    expect(provider.validate()).rejects.toThrow(
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
    mockSave.resolves({
      _id: "32131231231412341231",
      firstName: sampleProvider.firstName,
      lastName: sampleProvider.lastName,
      email: sampleProvider.email,
      phone: sampleProvider.phone,
      availabilities: sampleProvider.availabilties,
    });
    const response = await provider.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 200 and store the provider's bookings", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );

    mockFind.resolves([
      {
        _id: "23123123124133",
        clientId: "231231231231",
        providerId: "31231231231231231",
        startsAt: moment(),
        duration: 15,
        updatedAt: moment(),
        status: "BOOKED",
      },
      {
        _id: "2312323123432455",
        clientId: "231231231231",
        providerId: "31231231231231231",
        startsAt: moment().add(15, "minutes"),
        duration: 15,
        updatedAt: moment().add(15, "minutes"),
        status: "BOOKED",
      },
    ]);

    let response = await provider.getBookingsByDate(
      moment().format("YYYY-MM-DD"),
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
    expect(provider.bookings.length).toBe(2);
  });

  test("Should return 200 and get the provider's availability on a day", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );

    mockFind.resolves([
      {
        _id: "23123123124133",
        clientId: "231231231231",
        providerId: "31231231231231231",
        startsAt: moment(),
        duration: 15,
        updatedAt: moment(),
        status: "BOOKED",
      },
      {
        _id: "2312323123432455",
        clientId: "231231231231",
        providerId: "31231231231231231",
        startsAt: moment().add(15, "minutes"),
        duration: 15,
        updatedAt: moment().add(15, "minutes"),
        status: "BOOKED",
      },
    ]);

    let response = await provider.getavailabilityByDate(
      moment().format("YYYY-MM-DD"),
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
    console.log(provider.availableByDate);
  });
});
