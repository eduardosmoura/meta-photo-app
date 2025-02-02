import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePhotos } from './usePhotos';
import { apiService } from '../../services/api';

// Mock the apiService module using Vitest
vi.mock('../src/services/apiService', () => ({
  apiService: {
    get: vi.fn()
  }
}));

describe('usePhotos Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should set photos when API call is successful', async () => {
    const mockPhotos = [
      {
        id: 1,
        title: 'Photo 1',
        url: 'http://example.com/photo1.jpg',
        thumbnailUrl: 'http://example.com/thumb1.jpg',
        album: {
          id: 10,
          title: 'Album 1',
          user: {
            id: 100,
            name: 'User 1',
            email: 'user1@example.com'
          }
        }
      }
    ];
    // Simulate a successful API call
    (apiService.get as any).mockResolvedValue({ data: mockPhotos });

    // Render the hook with some initial filters.
    const { result } = renderHook(() => usePhotos({ limit: 10, offset: 0 }));

    // Initially, the hook sets loading to true.
    expect(result.current.loading).toBe(true);

    // Wait until loading becomes false and then verify the result.
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.photos).toEqual(mockPhotos);
      expect(result.current.error).toBe('');
    });
  });

  it('should set error when API call fails', async () => {
    const errorMessage = 'API error';
    // Simulate a failed API call.
    (apiService.get as any).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => usePhotos({ limit: 10, offset: 0 }));

    // Wait until the error state is updated.
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toEqual(errorMessage);
      expect(result.current.photos).toEqual([]);
    });
  });
});
