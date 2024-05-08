import {
  RequestMethod,
  handleErrors,
  isOkResponse,
  makeApiCall,
} from "@/utils/api-call";
import { notifyError } from "@/utils/notify";
import { useState } from "react";

export interface UseApiCallProps {}

export const useApiCall = <T, R>(method: RequestMethod, url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const run = async (payload?: T) => {
    setIsLoading(true);
    setIsError(false);

    const response = await makeApiCall<T, R>(method, url, payload);

    setIsLoading(false);

    if (isOkResponse(response)) return response.data;

    if (
      handleErrors(response, (message: string) => {
        notifyError;
      }) === "failed"
    ) {
      setIsError(true);
    }
  };

  return { isLoading, isError, run };
};
