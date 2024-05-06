import { ActionRequestDto, ActionResponseDto } from "./action.dto";

export interface ActionService {
  createActions: (data: ActionRequestDto[]) => Promise<ActionResponseDto[]>;
}
