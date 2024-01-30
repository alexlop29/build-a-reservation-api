import { stub, SinonStub } from "sinon";
import { provider, booking } from "../../database";
import { Provider } from "../../models";
import { sampleProvider, existingProvider } from "../util";
import { ResponseError } from "../../handlers";
const moment = require("moment");

describe("Should describe a provider", () => {
  let mockSave: SinonStub;
  let mockValidate: SinonStub;
  let mockFind: SinonStub;
  let mockFindOne: SinonStub;

  beforeEach(() => {
    mockSave = stub(provider.prototype, "save");
    mockValidate = stub(provider.prototype, "validate");
    mockFind = stub(booking, "find");
    mockFindOne = stub(provider, "findOne");
  });

  afterEach(() => {
    mockSave.restore();
    mockValidate.restore();
    mockFind.restore();
    mockFindOne.restore();
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
    mockValidate.resolves();
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
    mockValidate.rejects();
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
    mockValidate.rejects();
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
    mockValidate.rejects();
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
    mockValidate.rejects();
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
    mockValidate.rejects();
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
    mockValidate.rejects();
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
      "9089312",
      sampleProvider.availabilties,
    );
    mockValidate.rejects();
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
    mockValidate.resolves();
    await provider.validate();
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

  test("Should return 200, retrieve, and store a provider's profile", async () => {
    let provider = new Provider();
    mockFindOne.resolves({
      _id: "32131231231412341231",
      firstName: existingProvider.firstName,
      lastName: existingProvider.lastName,
      email: existingProvider.email,
      phone: existingProvider.phone,
      availabilities: existingProvider.availabilties,
    });
    let response = await provider.get(existingProvider.email);
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if the provider does not exist", async () => {
    let provider = new Provider();
    mockFindOne.rejects();
    await expect(provider.get(sampleProvider.email)).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200, retrieve, and store a provider's bookings by date", async () => {
    let provider = new Provider();
    mockFindOne.resolves({
      _id: "32131231231412341231",
      firstName: sampleProvider.firstName,
      lastName: sampleProvider.lastName,
      email: sampleProvider.email,
      phone: sampleProvider.phone,
      availabilities: sampleProvider.availabilties,
    });
    await provider.get(sampleProvider.email);
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
  });

  test("Should return 200, retrieve, and store a provider's availability on a specific date", async () => {
    let provider = new Provider();
    mockFindOne.resolves({
      _id: "32131231231412341231",
      firstName: sampleProvider.firstName,
      lastName: sampleProvider.lastName,
      email: sampleProvider.email,
      phone: sampleProvider.phone,
      availabilities: sampleProvider.availabilties,
    });
    await provider.get(sampleProvider.email);
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
    await provider.getBookingsByDate(moment().format("YYYY-MM-DD"));
    let response = await provider.getAvailabilityByDate(
      moment().format("YYYY-MM-DD"),
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});
