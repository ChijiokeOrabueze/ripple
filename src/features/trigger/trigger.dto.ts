export type TriggerParamResponseDto = {
  name: string;
};

export type TriggerResponseDto = {
  id: string;
  url: string;
  name: string;
  params: TriggerParamResponseDto[];
};
