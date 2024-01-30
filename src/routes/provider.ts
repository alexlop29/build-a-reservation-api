import { Router, json } from "express";
import { ProviderController } from "../controllers";
import { ResponseError } from "../handlers";

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
    console.log(`alex starting provider route`);
    let provider = await providerController.createProvider(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
      req.body.availabilities,
    );
    res.status(200).json({ provider });
  } catch (error) {
    if (error instanceof ResponseError) {
      res.status(error.status).json({ error });
    } else {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
});

export { providerRoute };
