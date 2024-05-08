import { Request, Response } from "express";
import { WorkflowService } from "./workflow.service";
import { constructErrorResponse, constructResponse } from "../../utils";
import { CreateWorkflowRequestDto } from "./workflow.dto";
import { ActionRequestDto } from "../action/action.dto";

export class WorkflowController {
  private readonly workflowService: WorkflowService;

  constructor(workflowService: WorkflowService) {
    this.workflowService = workflowService;
  }

  createWorkflow = async (
    req: Request<{}, {}, CreateWorkflowRequestDto, {}>,
    res: Response
  ) => {
    try {
      const result = await this.workflowService.createWorkflow(req.body);
      const response = constructResponse(
        result,
        "Workflow created successfully",
        "create"
      );
      res.status(response.code).json(response);
    } catch (err: any) {
      const error = constructErrorResponse(err);
      res.status(error.code).send(error);
    }
  };

  getWorkflows = async (
    req: Request<{}, {}, {}, { triggerId?: string }>,
    res: Response
  ) => {
    try {
      const result = await this.workflowService.getWorkflows(
        req.query.triggerId
      );
      const response = constructResponse(
        result,
        "Workflows fetched successfully"
      );
      res.status(response.code).json(response);
    } catch (err: any) {
      const error = constructErrorResponse(err);
      res.status(error.code).send(error);
    }
  };

  getWorkflow = async (
    req: Request<{ id: string }, {}, {}, {}>,
    res: Response
  ) => {
    try {
      const result = await this.workflowService.getWorkflow(req.params.id);
      const response = constructResponse(
        result,
        "Workflow fetched successfully"
      );
      res.status(response.code).json(response);
    } catch (err: any) {
      const error = constructErrorResponse(err);
      res.status(error.code).send(error);
    }
  };

  updateWorkflowAction = async (
    req: Request<
      { workflowId: string; actionId: string },
      {},
      ActionRequestDto,
      {}
    >,
    res: Response
  ) => {
    try {
      const result = await this.workflowService.editWorkflowAction(
        req.params.workflowId,
        req.params.actionId,
        req.body
      );
      const response = constructResponse(
        result,
        "Workflow action updated successfully"
      );
      res.status(response.code).json(response);
    } catch (err: any) {
      const error = constructErrorResponse(err);
      res.status(error.code).send(error);
    }
  };
}
