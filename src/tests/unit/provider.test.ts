import { provider } from "../../database/";
import { Provider } from "../../models/";
const moment = require("moment");
import { stub, SinonStub } from "sinon";

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

  beforeEach(() => {
    mockSave = stub(provider.prototype, "save");
  });

  afterEach(() => {
    mockSave.restore();
  });

  test("Should return 200 and create a new provider", async () => {
    let provider = new Provider(
      sampleProvider.firstName,
      sampleProvider.lastName,
      sampleProvider.email,
      sampleProvider.phone,
      sampleProvider.availabilties,
    );
    mockSave.resolves();
    const response = await provider.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});
