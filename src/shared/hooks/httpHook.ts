import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  const activeHttpRequests = useRef<AbortController[]>([]);

  const sendRequest = useCallback(
    async (
      url: string,
      method: string = 'GET',
      body: any = null,
      headers: any = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    ) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController();
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl,
        );

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        return responseData;
      } catch (err: any) {
        if (httpAbortCtrl.signal.aborted) {
          return;
        }

        setError(err.message);
        setIsLoading(false);
      }
    },
    [],
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
      clearError();
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
