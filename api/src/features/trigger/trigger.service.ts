import { ActionParamDto } from "../action/action.dto";
import { TriggerResponseDto } from "./trigger.dto";

export interface TriggerService {
  getTriggers: () => Promise<TriggerResponseDto[]>;
  getTrigger: (id: string) => Promise<TriggerResponseDto | null>;
  getTriggerByName: (triggerName: string) => Promise<TriggerResponseDto | null>;
  incomingActionsMatchesTrigger: (
    actionParams: ActionParamDto[],
    trigger: TriggerResponseDto
  ) => boolean;
  incomingDataMatchesTrigger: (
    data: Record<string, string>,
    trigger: TriggerResponseDto
  ) => boolean;
}
