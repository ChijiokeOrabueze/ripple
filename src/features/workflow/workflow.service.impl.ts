import { generateId } from "../../repositories/utils";
import { WorkflowRepository } from "../../repositories/workflow.repository";
import { ActionService } from "../action/action.service";
import { TriggerService } from "../trigger/trigger.service";
import { CreateWorkflowRequestDto } from "./workflow.dto";
import { WorkflowService } from "./workflow.service";

export class WorkflowServiceImpl implements WorkflowService {
  private readonly workflowRepository: WorkflowRepository;
  private readonly triggerService: TriggerService;
  private readonly actionService: ActionService;

  constructor(
    workflowRepository: WorkflowRepository,
    triggerService: TriggerService,
    actionService: ActionService
  ) {
    this.workflowRepository = workflowRepository;
    this.triggerService = triggerService;
    this.actionService = actionService;
  }

  createWorkflow = async (data: CreateWorkflowRequestDto) => {
    const trigger = await this.triggerService.getTrigger(data.trigger);

    if (!trigger) throw new Error("Trigger not found");

    const actions = await this.createActions(data.actions);

    const [createdData] = await this.workflowRepository.create([
      {
        name: data.name,
        trigger: generateId(trigger.id),
        actions: actions.map(({ action, order }) => ({
          action: generateId(action.id),
          order,
        })),
      },
    ]);

    return {
      id: createdData.id,
      trigger,
      actions,
      validFrom: createdData.validFrom || new Date(),
      validTo: createdData.validTo,
    };
  };

  getTriggerWorkflows = async (triggerId: string) => {
    const workflows = await this.workflowRepository.findMany([
      { field: "trigger", value: triggerId },
    ]);

    console.log({ workflows });
  };

  private createActions = async (data: CreateWorkflowRequestDto["actions"]) => {
    const actionUrlToOrderMap: { [url in string]: number } = {};

    const actionsToCreate = data.map(({ order, ...action }) => {
      actionUrlToOrderMap[action.url] = order;
      return action;
    });

    const createdActions = await this.actionService.createActions(
      actionsToCreate
    );

    return createdActions.map((action) => ({
      action,
      order: actionUrlToOrderMap[action.url],
    }));
  };
}
