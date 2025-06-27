
import { useState, useEffect } from 'react';
import { handleAsyncError } from '@/utils/errorHandling';

interface UseQueryResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useQuery = <T>(
  queryFn: () => Promise<T>,
  dependencies: any[] = []
): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await queryFn();
      setData(result);
    } catch (err) {
      setError(err as Error);
      await handleAsyncError(
        () => Promise.reject(err),
        "Failed to fetch data",
        false
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};
