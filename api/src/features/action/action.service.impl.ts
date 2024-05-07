import { ActionRepository } from "../../repositories/action.repository";
import { ActionRequestDto } from "./action.dto";
import { mapToActionResponseDto } from "./action.mappers";
import { ActionService } from "./action.service";

export class ActionServiceImpl implements ActionService {
  private readonly actionRepository: ActionRepository;

  constructor(actionRepository: ActionRepository) {
    this.actionRepository = actionRepository;
  }

  createActions = async (data: ActionRequestDto[]) => {
    const actions = await this.actionRepository.create(data);

    return actions.map((action) => mapToActionResponseDto(action));
  };

  updateAction = async (actionId: string, data: ActionRequestDto) => {
    const action = await this.actionRepository.updateOne(data, [
      { field: "id", value: actionId },
    ]);

    if (!action) throw new Error("Action not found");

    return mapToActionResponseDto(action);
  };
}
