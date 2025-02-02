import { useEffect, useMemo, useState } from 'react';
import { apiService } from '../../services/api';
import { toast } from 'react-toastify';

export interface Photo {
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  album: {
    id: number;
    title: string;
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

export interface PhotoFilters {
  title?: string;
  'album.title'?: string;
  'album.user.email'?: string;
  limit?: number;
  offset?: number;
}

export const usePhotos = (filters: PhotoFilters) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

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
        if (err instanceof Error) {
          setError(err.message);
          toast.error('Failed to load photos.');
        } else {
          setError(String(err));
          toast.error('An unexpected error occurred while loading photos.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, [queryKey, filters]);

  return { photos, loading, error };
};
