import { Validity } from "../../types";
import { ActionRequestDto, ActionResponseDto } from "../action/action.dto";
import { TriggerResponseDto } from "../trigger/trigger.dto";

export type WorkflowActionResponseDto = {
  action: ActionResponseDto;
  order: number;
};

export type WorkflowResponseDto = Validity & {
  id: string;
  name?: string;
  trigger: TriggerResponseDto;
  actions: WorkflowActionResponseDto[];
};

export type CreateWorkflowRequestDto = {
  name?: string;
  trigger: string;
  actions: (ActionRequestDto & { order: number })[];
};

export type GetWorkflowIdType = "triggerId" | "workflowId";
