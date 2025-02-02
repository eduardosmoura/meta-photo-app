import { useEffect, useMemo, useState } from 'react';
import { Photo } from 'types';
import { apiService } from '../../services/api';
import { handleApiError } from '../../utils/apiErrorHandler';

export interface PhotoFilters {
  title?: string;
  'album.title'?: string;
  'album.user.email'?: string;
  limit?: number;
  offset?: number;
}

export const usePhotos = (filters: PhotoFilters) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Memoize filter query string to avoid re-fetching if filters haven't changed
  const queryKey = useMemo(() => JSON.stringify(filters), [filters]);

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await apiService.get<Photo[]>('/externalapi/photos', {
          params: filters
        });
        setPhotos(data);
      } catch (err: unknown) {
        const errorMessage = handleApiError(err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [queryKey, filters]);

  return { photos, loading, error };
};
