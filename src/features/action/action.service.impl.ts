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
}
