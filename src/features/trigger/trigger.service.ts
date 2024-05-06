import { TriggerResponseDto } from "./trigger.dto";

export interface TriggerService {
  getTriggers: () => Promise<TriggerResponseDto[]>;
}
