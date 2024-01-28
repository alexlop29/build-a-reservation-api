import { provider } from "../../database/";
import { Provider } from "../../models/";
const moment = require("moment");
import { stub, SinonStub } from "sinon";
import { ResponseError } from "../../handlers";

/*
Need to normalize the weekday
*/

describe("Should describe a provider", () => {
  let sampleProvider = {
    firstName: "John",
    lastName: "Tucker",
    email: "jtucker@gmail.com",
    phone: "9127772389",
    availabilties: [
      {
        weekDay: "Monday",
        startAt: moment().day("Monday").hour(9).minute(0).second(0),
        endAt: moment().day("Monday").hour(17).minute(0).second(0),
      },
      {
        weekDay: "Friday",
        startAt: moment().day("Monday").hour(9).minute(0).second(0),
        endAt: moment().day("Monday").hour(17).minute(0).second(0),
      },
    ],
  };
  let mockSave: SinonStub;
  let mockValidate: SinonStub;

  beforeEach(() => {
    mockSave = stub(provider.prototype, "save");
    mockValidate = stub(provider.prototype, "validate");
  });

  afterEach(() => {
    mockSave.restore();
    mockValidate.restore();
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
});
