import useSWR from "swr";
import { useEffect, useRef } from "react";

const useAbortControllerSWR = (url: string, fetcher: any, options?: any) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  const abortControllerFetcher = async (url: string) => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    try {
      return await fetcher(url, { signal });
    } catch (error) {
      if (signal.aborted) {
        console.log("Request was aborted");
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return useSWR(url, abortControllerFetcher, options);
};

export default useAbortControllerSWR;
