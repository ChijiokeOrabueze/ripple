import { Request, Response } from "express";
import { TriggerService } from "./trigger.service";
import { constructErrorResponse, constructResponse } from "../../utils";

export class TriggerController {
  private readonly triggerService: TriggerService;

  constructor(triggerService: TriggerService) {
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
      const error = constructErrorResponse(err);
      res.status(error.code).send(error);
    }
  };
}
