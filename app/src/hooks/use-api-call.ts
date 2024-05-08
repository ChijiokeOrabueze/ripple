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

  const run = async (payload?: T, urlAppendage?: string) => {
    setIsLoading(true);
    setIsError(false);

    const response = await makeApiCall<T, R>(
      method,
      `${url}${urlAppendage || ""}`,
      payload
    );

    setIsLoading(false);

    if (isOkResponse(response)) return response.data;

    if (handleErrors(response, notifyError) === "failed") {
      setIsError(true);
    }
  };

  return { isLoading, isError, run };
};
