import { Client } from "../../models/index.js";
import { client } from "../../database/index.js";
import { stub, SinonStub } from "sinon";
import { ResponseError } from "../../handlers/index.js";
import { sampleClient } from "../util/index.js";

describe("Should describe a client", () => {
  let mockSave: SinonStub;
  let mockValidate: SinonStub;

  beforeEach(() => {
    mockSave = stub(client.prototype, "save");
    mockValidate = stub(client.prototype, "validate");
  });

  afterEach(() => {
    mockSave.restore();
    mockValidate.restore();
  });

  test("Should return 200 if the client's properties are valid", async () => {
    let client = new Client(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      sampleClient.phone,
    );
    mockValidate.resolves();
    const response = await client.validate();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if client's first name is empty", () => {
    let client = new Client(
      "",
      sampleClient.lastName,
      sampleClient.email,
      sampleClient.phone,
    );
    mockValidate.rejects();
    expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's last name is empty", () => {
    let client = new Client(
      sampleClient.firstName,
      "",
      sampleClient.email,
      sampleClient.phone,
    );
    mockValidate.rejects();
    expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's email is empty", () => {
    let client = new Client(
      sampleClient.firstName,
      sampleClient.lastName,
      "",
      sampleClient.phone,
    );
    mockValidate.rejects();
    expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's email is invalid", () => {
    let client = new Client(
      sampleClient.firstName,
      sampleClient.lastName,
      "23123@",
      sampleClient.phone,
    );
    mockValidate.rejects();
    expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's phone number is empty", () => {
    let client = new Client(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      "",
    );
    mockValidate.rejects();
    expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's phone number is invalid", () => {
    let client = new Client(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      "23123",
    );
    mockValidate.rejects();
    expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 and create a new client", async () => {
    let client = new Client(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      sampleClient.phone,
    );
    mockSave.resolves({
      _id: "534534534535312131",
      firstName: sampleClient.firstName,
      lastName: sampleClient.lastName,
      email: sampleClient.email,
      phone: sampleClient.phone,
    });
    const response = await client.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});
