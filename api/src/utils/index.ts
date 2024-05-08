import { ApiError } from "../error";

export const constructResponse = <T>(
  data: T,
  message: string,
  httpAction?: string
) => {
  return {
    status: "success",
    code: httpAction === "create" ? 201 : 200,
    message,
    data,
  };
};

export const constructErrorResponse = (err: ApiError | Error) => {
  const structuredError = ApiError.manageError(err);
  return {
    code: structuredError.msg.status,
    error: structuredError.error,
    message: structuredError.msg.message,
  };
};
