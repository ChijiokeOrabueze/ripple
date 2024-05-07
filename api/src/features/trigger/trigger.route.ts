import { Router } from "express";
import { TriggerController } from "./trigger.controller";
import { ApiContext } from "../../context";

export const triggerRouter = () => {
  const router = Router();
  const triggerController = new TriggerController(
    ApiContext.getTriggerService()
  );

  router.route("/").get(triggerController.getTriggers);

  return router;
};
