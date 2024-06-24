import { useEffect, useRef } from "react";

const useAbortableFetch = (url: string, options?: RequestInit) => {
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    const fetchData = async () => {
      try {
        const response = await fetch(url, { ...options, signal });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return await response.json();
      } catch (error) {
        if (signal.aborted) {
          console.log("Fetch aborted");
        } else {
          console.error("Fetch error:", error);
        }
      }
    };

    fetchData();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [url, options]);

  return null;
};

export default useAbortableFetch;
