import { ITrigger, ITriggerParam } from "../../db/models/trigger.model";

export const mapToTriggerResponseDto = ({
  createdBy,
  updatedBy,
  params,
  ...others
}: ITrigger &
  ({ id: string; _id?: string } | { _id: string; id?: string })) => {
  return {
    ...others,
    id: others._id || others.id,
    params: params.map((data) => mapToTriggerParamResponseDto(data)),
  };
};

const mapToTriggerParamResponseDto = (param: ITriggerParam) => {
  return param;
};
