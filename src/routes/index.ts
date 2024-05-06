import { Router } from "express";
import { triggerRouter } from "../features/trigger/trigger.route";

export const routes = () => {
  const globalRouter = Router();

  globalRouter.use("/triggers", triggerRouter());

  return globalRouter;
};
