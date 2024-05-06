import { Request, Response } from "express";
import { WorkflowService } from "./workflow.service";
import { constructResponse } from "../../utils";

export class TriggerController {
  private readonly triggerService: WorkflowService;

  constructor(triggerService: WorkflowService) {
    this.triggerService = triggerService;
  }

  getTriggers = async (req: Request<{}, {}, {}, {}>, res: Response) => {
    try {
      const result = await this.triggerService.getTriggers();
      const response = constructResponse(
        result,
        "Trigger fetched successfully"
      );
      res.status(response.code).json(response);
    } catch (err: any) {
      console.log({ err });
    }
  };
}
