export type StaticCustomError =
  | "notFound"
  | "forbidden"
  | "unauthorized"
  | "unauthorizedForAction"
  | "systemError"
  | "invalidCredentials";

export type DynamicCustomErrorType =
  | "itemNotFound"
  | "invalidItem"
  | "alreadyExists";

export type DynamicCustomError = {
  errorType: DynamicCustomErrorType;
  appendage: string;
  appendBeside?: boolean;
  tailAppendage?: string;
};

export type CustomErrorBody = {
  status: number;
  message: string;
};

export type StaticCustomErrorMap = {
  [x in StaticCustomError]: CustomErrorBody;
};

export type DynamicCustomErrorMap = {
  [x in DynamicCustomErrorType]: (
    field: string,
    tailAppendage?: string,
    appendBeside?: boolean
  ) => CustomErrorBody;
};

export function isDynamicCustomError(
  data: DynamicCustomError | StaticCustomError
): data is DynamicCustomError {
  return (data as DynamicCustomError).errorType !== undefined;
}
