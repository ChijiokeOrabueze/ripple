import { ActionService } from "../features/action/action.service";
import { ActionServiceImpl } from "../features/action/action.service.impl";
import { ClientService } from "../features/client/client.service";
import { ClientServiceImpl } from "../features/client/client.service.impl";
import { TriggerService } from "../features/trigger/trigger.service";
import { TriggerServiceImpl } from "../features/trigger/trigger.service.impl";
import { WorkflowService } from "../features/workflow/workflow.service";
import { WorkflowServiceImpl } from "../features/workflow/workflow.service.impl";
import { ActionRepository } from "../repositories/action.repository";
import { TriggerRepository } from "../repositories/trigger.repository";
import { WorkflowRepository } from "../repositories/workflow.repository";

export class ApiContext {
  static getTriggerRepository = () => new TriggerRepository();
  static getActionRepository = () => new ActionRepository();
  static getWorkflowRepository = () => new WorkflowRepository();

  static getTriggerService = (): TriggerService =>
    new TriggerServiceImpl(this.getTriggerRepository());

  static getActionService = (): ActionService =>
    new ActionServiceImpl(this.getActionRepository());

  static getWorkflowService = (): WorkflowService =>
    new WorkflowServiceImpl(
      this.getWorkflowRepository(),
      this.getTriggerService(),
      this.getActionService()
    );

  static getClientService = (): ClientService =>
    new ClientServiceImpl(this.getTriggerService());
}
