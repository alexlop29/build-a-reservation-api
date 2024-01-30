import { Client } from "../../models";
import { client } from "../../database";
import { stub, SinonStub } from "sinon";
import { ResponseError } from "../../handlers";
import { sampleClient, existingClient } from "../util";

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

  test("Should return 200, initalize the client, and store provided properties", async () => {
    let provider = new Client();
    let response = await provider.init(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      sampleClient.phone,
    );
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 200 if the client's properties are valid", async () => {
    let provider = new Client();
    await provider.init(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      sampleClient.phone,
    );
    mockValidate.resolves();
    const response = await provider.validate();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });

  test("Should return 400 if client's first name is empty", async () => {
    let client = new Client();
    await client.init(
      "",
      sampleClient.lastName,
      sampleClient.email,
      sampleClient.phone,
    );
    mockValidate.rejects();
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's last name is empty", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      "",
      sampleClient.email,
      sampleClient.phone,
    );
    mockValidate.rejects();
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's email is empty", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      sampleClient.lastName,
      "",
      sampleClient.phone,
    );
    mockValidate.rejects();
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's email is invalid", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      sampleClient.lastName,
      "2312312@",
      sampleClient.phone,
    );
    mockValidate.rejects();
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the email address is already in use", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      sampleClient.lastName,
      existingClient.email,
      sampleClient.phone,
    );
    mockValidate.rejects();
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's phone number is empty", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      "",
    );
    mockValidate.rejects();
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's phone number is invalid", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      "2312",
    );
    mockValidate.rejects();
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 200 and create a new client", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      sampleClient.lastName,
      sampleClient.email,
      sampleClient.phone,
    );
    mockValidate.resolves();
    await client.validate();
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
