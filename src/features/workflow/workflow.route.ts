import { Router } from "express";
import { TriggerController } from "./workflow.controller";
import { TriggerServiceImpl } from "./workflow.service.impl";
import { TriggerRepository } from "../../repositories/trigger.repository";

export const triggerRouter = () => {
  const router = Router();

  const triggerRepository = new TriggerRepository();
  const triggerService = new TriggerServiceImpl(triggerRepository);
  const triggerController = new TriggerController(triggerService);

  router.route("/").get(triggerController.getTriggers);

  return router;
};
