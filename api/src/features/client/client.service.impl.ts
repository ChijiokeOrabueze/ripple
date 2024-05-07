import { TriggerService } from "../trigger/trigger.service";
import { WorkflowResponseDto } from "../workflow/workflow.dto";
import { WorkflowService } from "../workflow/workflow.service";
import { ClientResponse } from "./client.dto";
import { ClientService } from "./client.service";
import axios from "axios";

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

    const triggerWorkflows = await this.workflowService.getWorkflows(
      trigger.id
    );

    const result: ClientResponse[] = [];

    triggerWorkflows.forEach((workflow) =>
      this.runWorkflowActions(workflow, data, result)
    );

    return result;
  };

  runWorkflowActions = async (
    { actions }: WorkflowResponseDto,
    data: Record<string, string>,
    result: ClientResponse[]
  ) => {
    actions.sort((a, b) => {
      if (typeof a.order === "number" && typeof b.order === "number")
        return a.order - b.order;

      return typeof a.order === "number"
        ? -1
        : typeof b.order === "number"
        ? 1
        : 0;
    });

    for (const { action } of actions) {
      const params = action.params
        .map(({ name, value }) => `${name}=${data[value]}`)
        .join("&");

      const finalUrl = `${action.url}${params.length && "?"}${params}`;

      try {
        const axiosCall = await axios.get(finalUrl);
        result.push({ action, response: axiosCall.data });
      } catch (err) {
        result.push({ action, response: "failed" });
      }
    }

    return result;
  };
}
