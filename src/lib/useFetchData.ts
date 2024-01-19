import { useState, useCallback } from 'react';

export const useFetchData = <T,>(fetchFunction: () => Promise<T>, onSuccess: (data: T) => void) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await fetchFunction();
      onSuccess(data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, onSuccess]);

  return { fetchData, isLoading };
};