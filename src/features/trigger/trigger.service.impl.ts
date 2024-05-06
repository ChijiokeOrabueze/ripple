import { TriggerRepository } from "../../repositories/trigger.repository";
import { TriggerService } from "./trigger.service";

export class TriggerServiceImpl implements TriggerService {
  private readonly triggerRepository: TriggerRepository;

  constructor(triggerRepository: TriggerRepository) {
    this.triggerRepository = triggerRepository;
  }

  h = async () => {
    const h = await this.triggerRepository.findMany();
  };
}
