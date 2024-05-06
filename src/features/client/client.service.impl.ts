import { TriggerResponseDto } from "../trigger/trigger.dto";
import { TriggerService } from "../trigger/trigger.service";
import { WorkflowService } from "../workflow/workflow.service";
import { ClientService } from "./client.service";

export class ClientServiceImpl implements ClientService {
  private readonly triggerService: TriggerService;
  private readonly workflowService: WorkflowService;

  constructor(
    triggerService: TriggerService,
    workflowService: WorkflowService
  ) {
    this.triggerService = triggerService;
    this.workflowService = workflowService;
  }

  runTriggerActions = async (
    triggerName: string,
    data: Record<string, string>
  ) => {
    const trigger = await this.triggerService.getTriggerByName(triggerName);

    if (!trigger) throw new Error("Trigger not found");

    if (!this.triggerService.incomingDataMatchesTrigger(data, trigger))
      throw new Error("Incomplete trigger params");

    await this.workflowService.getTriggerWorkflows(trigger.id);
  };
}
