import { IAction, IActionParam } from "../../db/models/action.model";
import { ActionResponseDto } from "./action.dto";

export const mapToActionResponseDto = ({
  createdBy,
  updatedBy,
  params,
  ...others
}: IAction & { id: string }): ActionResponseDto => {
  return {
    ...others,
    params: params.map((data) => mapToActionParamResponseDto(data)),
  };
};

const mapToActionParamResponseDto = (param: IActionParam) => {
  return param;
};
