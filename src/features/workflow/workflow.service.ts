import { CreateWorkflowRequestDto, WorkflowResponseDto } from "./workflow.dto";

export interface WorkflowService {
  createWorkflow: (
    data: CreateWorkflowRequestDto
  ) => Promise<WorkflowResponseDto>;
}
