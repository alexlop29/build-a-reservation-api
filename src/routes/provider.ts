import { Router, json } from "express";
import { ProviderController } from "../controllers/provider.js";
import { ResponseError } from "../handlers/error.js";

const providerRoute = Router();
providerRoute.use(json());

const providerController = new ProviderController();

providerRoute.get("/availability/search", async (req, res) => {
  try {
    let response = await providerController.getProviderAvailabilityByDate(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.availabilities,
      req.body.date,
    );
    return res.status(200).json(response);
  } catch (error) {
    if (error instanceof ResponseError) {
      return res.status(error.status).json(error);
    } else {
      return res.status(500);
    }
  }
});

providerRoute.post("/", async (req, res) => {
  try {
    await providerController.createProvider(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.availabilities,
    );
    return res.status(200);
  } catch (error) {
    if (error instanceof ResponseError) {
      return res.status(error.status);
    } else {
      return res.status(500);
    }
  }
});

export { providerRoute };
