import {
  customSystemError,
  dynamicCustomErrorMap,
  staticCustomErrorMap,
} from "./constants";
import {
  DynamicCustomError,
  StaticCustomError,
  isDynamicCustomError,
} from "./types/global";

export class ApiError extends Error {
  public error: StaticCustomError | DynamicCustomError;

  constructor(err: StaticCustomError | DynamicCustomError) {
    if (isDynamicCustomError(err)) {
      super(err.errorType);
    } else {
      super(err);
    }
    this.error = err;
  }

  static manageError = (err: ApiError | Error) => {
    if (err instanceof ApiError) {
      return this.handleApiErrorType(err);
    }
    return {
      custom: false,
      error: err.message || err,
      msg: customSystemError,
    };
  };

  private static handleApiErrorType = (err: ApiError) => {
    if (isDynamicCustomError(err.error)) {
      const error = dynamicCustomErrorMap[err.error.errorType](
        err.error.appendage,
        err.error.tailAppendage,
      );
      return {
        custom: true,
        error: error.message,
        msg: error,
      };
    }

    return {
      custom: true,
      error: staticCustomErrorMap[err.error].message,
      msg: staticCustomErrorMap[err.error],
    };
  };
}
