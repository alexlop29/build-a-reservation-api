import { Router, json } from "express";
import { ClientController } from "../controllers/client";
import { ResponseError } from "../handlers";

const clientRoute = Router();
clientRoute.use(json());

const clientController = new ClientController();

clientRoute.post("/", async (req, res) => {
  try {
    let client = await clientController.createClient(
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.phone,
    );
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof ResponseError) {
      res.status(error.status).json({
        status: error.status,
        message: error.message,
      });
    } else {
      res.status(500).json({
        status: 500,
        message: "Internal Server Error",
      });
    }
  }
});

export { clientRoute };
