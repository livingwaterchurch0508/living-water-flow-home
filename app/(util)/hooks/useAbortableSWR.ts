import useSWR from "swr";
import { useEffect, useRef } from "react";

const useAbortableSWR = (url: string, fetcher: any, options?: any) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    fetcher(url, { signal });

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url]);

  return useSWR(url, fetcher, options);
};

export default useAbortableSWR;
