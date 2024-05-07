import { ITrigger, ITriggerParam } from "../../db/models/trigger.model";

export const mapToTriggerResponseDto = ({
  createdBy,
  updatedBy,
  params,
  id,
  _id,
  __v,
  ...others
}: ITrigger & { __v?: number } & (
    | { id: string; _id?: string }
    | { _id: string; id?: string }
  )) => {
  return {
    ...others,
    id: _id || id,
    params: params.map((data) => mapToTriggerParamResponseDto(data)),
  };
};

const mapToTriggerParamResponseDto = (param: ITriggerParam) => {
  return param;
};
