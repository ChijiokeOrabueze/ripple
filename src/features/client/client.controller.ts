import { Request, Response } from "express";
import { ClientService } from "./client.service";
import { constructResponse } from "../../utils";

export class ClientController {
  private readonly clientService: ClientService;

  constructor(clientService: ClientService) {
    this.clientService = clientService;
  }

  runClientTriggerActions = async (
    req: Request<{ clientTriggerName: string }, {}, Record<string, string>, {}>,
    res: Response
  ) => {
    try {
      const result = await this.clientService.runTriggerActions(
        req.params.clientTriggerName,
        req.body
      );
      const response = constructResponse(
        result,
        `Trigger ran successfully for ${req.params.clientTriggerName}`
      );
      res.status(response.code).json(response);
    } catch (err: any) {
      console.log({ err });
      res.status(400).send(err);
    }
  };
}
