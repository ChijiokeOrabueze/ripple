import { IAction, IActionParam } from "../../db/models/action.model";

export const mapToActionResponseDto = ({
  createdBy,
  updatedBy,
  params,
  ...others
}: IAction & { id: string }) => {
  return {
    ...others,
    params: params.map((data) => mapToActionParamResponseDto(data)),
  };
};

const mapToActionParamResponseDto = (param: IActionParam) => {
  return param;
};
