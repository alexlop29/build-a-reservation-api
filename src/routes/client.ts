import { Router, json } from "express";
import { ClientController } from "../controllers/client";
import { ResponseError } from "../handlers";

const clientRoute = Router();
clientRoute.use(json());

const clientController = new ClientController();

clientRoute.post("/", async (req, res) => {
  try {
    await clientController.createClient(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
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

export { clientRoute };
