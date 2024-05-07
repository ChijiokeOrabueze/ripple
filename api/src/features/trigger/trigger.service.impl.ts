import { TriggerRepository } from "../../repositories/trigger.repository";
import { ActionParamDto } from "../action/action.dto";
import { TriggerResponseDto } from "./trigger.dto";
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

  getTrigger = async (id: string) => {
    const [trigger] = await this.triggerRepository.findMany([
      { field: "id", value: id },
      { field: "validTo", value: null },
    ]);

    if (!trigger) return null;

    return mapToTriggerResponseDto(trigger);
  };

  getTriggerByName = async (name: string) => {
    const [trigger] = await this.triggerRepository.findMany([
      { field: "name", value: name },
      { field: "validTo", value: null },
    ]);

    if (!trigger) return null;

    return mapToTriggerResponseDto(trigger);
  };

  incomingDataMatchesTrigger = (
    data: Record<string, string>,
    trigger: TriggerResponseDto
  ) => {
    if (!trigger.params.length) return true;

    return trigger.params.every(({ name }) => name in data);
  };

  incomingActionsMatchesTrigger = (
    actionParams: ActionParamDto[],
    trigger: TriggerResponseDto
  ) => {
    const triggerParamMap: { [key in string]: true } = {};

    trigger.params.forEach(({ name }) => {
      triggerParamMap[name] = true;
    });

    return actionParams.every(({ value }) => value in triggerParamMap);
  };
}
