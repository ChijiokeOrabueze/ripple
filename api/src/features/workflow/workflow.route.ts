import { Router } from "express";
import { WorkflowController } from "./workflow.controller";
import { ApiContext } from "../../context";

export const workflowRouter = () => {
  const router = Router();

  const workflowController = new WorkflowController(
    ApiContext.getWorkflowService()
  );

  router
    .route("/")
    .post(workflowController.createWorkflow)
    .get(workflowController.getWorkflows);

  router
    .route("/:workflowId/:actionId")
    .put(workflowController.updateWorkflowAction);

  return router;
};
