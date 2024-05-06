import { ITrigger, ITriggerParam } from "../../db/models/trigger.model";

export const mapToTriggerResponseDto = ({
  createdBy,
  updatedBy,
  params,
  ...others
}: ITrigger & { id: string }) => {
  return {
    ...others,
    params: params.map((data) => mapToTriggerParamResponseDto(data)),
  };
};

const mapToTriggerParamResponseDto = (param: ITriggerParam) => {
  return param;
};
