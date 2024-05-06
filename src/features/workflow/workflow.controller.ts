import { Request, Response } from "express";
import { WorkflowService } from "./workflow.service";
import { constructResponse } from "../../utils";
import { CreateWorkflowRequestDto } from "./workflow.dto";

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
      console.log({ err });
      res.status(400).send(err);
    }
  };
}
