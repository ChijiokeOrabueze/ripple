import { ITrigger } from "../../db/models/trigger.model";
import { generateId } from "../../repositories/utils";
import { WorkflowRepository } from "../../repositories/workflow.repository";
import { ActionService } from "../action/action.service";
import { TriggerResponseDto } from "../trigger/trigger.dto";
import { mapToTriggerResponseDto } from "../trigger/trigger.mappers";
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

    const actions = await this.createActions(data.actions, trigger);

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
    const workflows = await this.workflowRepository.findManyAndPopulate([
      { field: "trigger", value: triggerId },
    ]);

    return workflows.map((workflow) => ({
      id: workflow.id,
      trigger: mapToTriggerResponseDto(workflow.trigger),
      actions: workflow.actions.map(
        ({ action: { _id, ...others }, order }) => ({
          order,
          action: { ...others, id: _id },
        })
      ),
      validFrom: workflow.validFrom || new Date(),
      validTo: workflow.validTo,
    }));
  };

  private createActions = async (
    data: CreateWorkflowRequestDto["actions"],
    trigger: TriggerResponseDto
  ) => {
    const actionUrlToOrderMap: { [url in string]: number } = {};

    let isIncompleteParam = false;

    const actionsToCreate = data.map(({ order, ...action }) => {
      if (
        !this.triggerService.incomingActionsMatchesTrigger(
          action.params,
          trigger
        )
      )
        isIncompleteParam = true;
      actionUrlToOrderMap[action.url] = order;
      return action;
    });

    if (isIncompleteParam)
      throw new Error("Trigger and action is incompatible");

    const createdActions = await this.actionService.createActions(
      actionsToCreate
    );

    return createdActions.map((action) => ({
      action,
      order: actionUrlToOrderMap[action.url],
    }));
  };
}
