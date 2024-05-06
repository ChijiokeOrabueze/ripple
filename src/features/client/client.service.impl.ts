import { TriggerResponseDto } from "../trigger/trigger.dto";
import { TriggerService } from "../trigger/trigger.service";
import { ClientService } from "./client.service";

export class ClientServiceImpl implements ClientService {
  private readonly triggerService: TriggerService;
  // private readonly triggerService: TriggerService;

  constructor(triggerService: TriggerService) {
    this.triggerService = triggerService;
  }

  runTriggerActions = async (
    triggerName: string,
    data: Record<string, string>
  ) => {
    const trigger = await this.triggerService.getTriggerByName(triggerName);

    if (!trigger) throw new Error("Trigger not found");

    if (!this.incomingDataMatchesTrigger(data, trigger))
      throw new Error("Incomplete trigger params");
  };

  private incomingDataMatchesTrigger = (
    data: Record<string, string>,
    trigger: TriggerResponseDto
  ) => {
    if (!trigger.params.length) return true;

    return trigger.params.every(({ name }) => name in data);
  };
}
