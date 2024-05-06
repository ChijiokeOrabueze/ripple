import { TriggerService } from "../trigger/trigger.service";
import { ClientService } from "./client.service";

export class ClientServiceImpl implements ClientService {
  private readonly triggerService: TriggerService;

  constructor(triggerService: TriggerService) {
    this.triggerService = triggerService;
  }

  runTriggerActions = async () => {};
}
