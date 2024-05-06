import { TriggerRepository } from "../../repositories/trigger.repository";
import { mapToTriggerResponseDto } from "./trigger.mappers";
import { TriggerService } from "./trigger.service";

export class TriggerServiceImpl implements TriggerService {
  private readonly triggerRepository: TriggerRepository;

  constructor(triggerRepository: TriggerRepository) {
    this.triggerRepository = triggerRepository;
  }

  getTriggers = async () => {
    const triggers = await this.triggerRepository.findMany([
      { field: "validTo", value: null },
    ]);

    return triggers.map((trigger) => mapToTriggerResponseDto(trigger));
  };
}
