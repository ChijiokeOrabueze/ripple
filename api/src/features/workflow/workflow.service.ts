import { ActionRequestDto } from "../action/action.dto";
import { CreateWorkflowRequestDto, WorkflowResponseDto } from "./workflow.dto";

export interface WorkflowService {
  createWorkflow: (
    data: CreateWorkflowRequestDto
  ) => Promise<WorkflowResponseDto>;

  getWorkflows: (triggerId?: string) => Promise<WorkflowResponseDto[]>;

  editWorkflowAction: (
    workflowId: string,
    actionId: string,
    update: ActionRequestDto
  ) => Promise<WorkflowResponseDto>;

  getWorkflow: (id: string) => Promise<WorkflowResponseDto>;
}
