import { Request, Response } from "express";
import { TriggerService } from "./trigger.service";
import { constructResponse } from "../../utils";

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
      console.log({ err });
      res.status(400).send(err);
    }
  };
}
