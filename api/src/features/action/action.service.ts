import { ActionRequestDto, ActionResponseDto } from "./action.dto";

export interface ActionService {
  createActions: (data: ActionRequestDto[]) => Promise<ActionResponseDto[]>;

  updateAction: (
    actionId: string,
    data: ActionRequestDto
  ) => Promise<ActionResponseDto>;
}
