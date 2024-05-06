import { Router } from "express";
import { ClientController } from "./client.controller";
import { ApiContext } from "../../context";

export const triggerRouter = () => {
  const router = Router();
  const clientController = new ClientController(ApiContext.getClientService());

  router
    .route("/:clientTriggerName")
    .get(clientController.runClientTriggerActions);

  return router;
};
