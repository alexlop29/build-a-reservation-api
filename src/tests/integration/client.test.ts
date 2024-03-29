import { existingClient, initialize, sampleClient } from "../util";
import { Client } from "../../models";
import { ResponseError } from "../../handlers";

describe("Should describe a client", () => {
  beforeAll(async () => {
    await initialize();
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
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if client's last name is empty", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      "",
      sampleClient.email,
      sampleClient.phone,
    );
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
    await expect(client.validate()).rejects.toThrow(
      new ResponseError(400, "Bad Request"),
    );
  });

  test("Should return 400 if the client's email already exists", async () => {
    let client = new Client();
    await client.init(
      sampleClient.firstName,
      sampleClient.lastName,
      existingClient.email,
      sampleClient.phone,
    );
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
    await client.validate();
    const response = await client.save();
    expect(response.status).toBe(200);
    expect(response.message).toBe("OK");
  });
});
