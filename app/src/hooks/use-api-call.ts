import {
  RequestMethod,
  SuccessResponse,
  handleErrors,
  isOkResponse,
  makeApiCall,
} from "@/utils/api-call";
import { notify } from "@/utils/notify";
import { useState } from "react";

export interface UseApiCallProps {}

export const useApiCall = <T, R>(
  method: RequestMethod,
  url: string,
  payload?: T
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const run = async () => {
    setIsLoading(true);
    setIsError(false);

    const response = await makeApiCall<T, R>(method, url, payload);

    setIsLoading(false);

    if (isOkResponse(response)) return response.data;

    if (
      handleErrors(response, (message: string) => {
        notify("error", message);
      }) === "failed"
    ) {
      setIsError(true);
    }
  };

  return { isLoading, isError, run };
};
