import { useEffect, DependencyList, useState } from "react";
import { useApiCall } from "./use-api-call";
import { RequestMethod } from "@/utils/api-call";

export const useEffectApiCall = <T, R>(
  method: RequestMethod,
  url: string,
  payload?: T,
  deps?: DependencyList
) => {
  const { isLoading, isError, run } = useApiCall<T, R>(method, url, payload);
  const [data, setData] = useState<R>();
  useEffect(() => {
    const makeCall = async () => {
      const result = await run();

      if (result) setData(result);
    };
    makeCall();
  }, deps);

  return { data, isLoading, isError };
};
