import { TriggerResponseDto } from "./trigger.dto";

export interface TriggerService {
  getTriggers: () => Promise<TriggerResponseDto[]>;
  getTrigger: (id: string) => Promise<TriggerResponseDto | null>;
  getTriggerByName: (triggerName: string) => Promise<TriggerResponseDto | null>;
}
