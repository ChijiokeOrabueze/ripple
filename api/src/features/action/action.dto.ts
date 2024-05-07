export type ActionParamDto = {
  name: string;
  value: string;
};

export type ActionRequestDto = {
  url: string;
  name: string;
  params: ActionParamDto[];
};

export type ActionResponseDto = ActionRequestDto & {
  id: string;
};
