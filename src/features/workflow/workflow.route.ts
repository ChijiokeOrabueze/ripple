import { Router } from "express";
import { WorkflowController } from "./workflow.controller";
import { ApiContext } from "../../context";

export const triggerRouter = () => {
  const router = Router();

  const workflowController = new WorkflowController(
    ApiContext.getWorkflowService()
  );

  router.route("/").post(workflowController.createWorkflow);

  return router;
};
