export type RequestMethod = "post" | "get" | "put";

export type SuccessResponse<T> = { code: 200 | 201; data: T };

export type ErrorResponse = { code: number; error: unknown; message: string };

const constructRequest = <T>(method: RequestMethod, payload: T) => {
  const headers = new Headers({
    "Content-Type": "application/json",
  });

  if (method == "post" || method == "put") {
    return {
      method,
      body: JSON.stringify(payload),
      headers,
    };
  }
  return {
    method,
    headers,
  };
};

export const makeApiCall = async <T, R>(
  method: RequestMethod,
  url: string,
  payload: T
) => {
  try {
    const request = constructRequest(method, payload);
    const response = await fetch(url, request);

    return (await response.json()) as SuccessResponse<R> | ErrorResponse;
  } catch (error) {
    return {
      code: 400,
      error,
      message: "Failed to fetch. Please check your internet connection",
    };
  }
};

export const handleErrors = <T>(
  response: SuccessResponse<T> | ErrorResponse,
  errorToast: (error: string) => void
) => {
  if (isOkResponse(response)) return "success";

  if (response.message) errorToast(response.message);

  errorToast(
    "Something went wrong while trying to process your request. Please try again."
  );
  return "failed";
};

export const isOkResponse = <T>(
  response: SuccessResponse<T> | ErrorResponse
): response is SuccessResponse<T> => [200, 201].includes(response?.code);
