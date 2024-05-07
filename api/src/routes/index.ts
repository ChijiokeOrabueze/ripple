import { Router } from "express";
import { triggerRouter } from "../features/trigger/trigger.route";
import { workflowRouter } from "../features/workflow/workflow.route";
import { clientRouter } from "../features/client/client.route";

export const routes = () => {
  const globalRouter = Router();

  globalRouter.use("/triggers", triggerRouter());
  globalRouter.use("/workflows", workflowRouter());
  globalRouter.use("/clients", clientRouter());

  return globalRouter;
};
