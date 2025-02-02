// tests/PhotoGallery.test.tsx
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { usePhotos } from '../../hooks/usePhotos/usePhotos';
import PhotoGallery from './PhotoGallery';

// Mock the usePhotos hook from our hooks folder
vi.mock('../src/hooks/usePhotos', () => ({
  usePhotos: vi.fn()
}));

describe('PhotoGallery Component', () => {
  const mockPhotos = [
    {
      id: 1,
      title: 'Test Photo 1',
      url: 'http://example.com/photo1.jpg',
      thumbnailUrl: 'http://example.com/thumb1.jpg',
      album: {
        id: 10,
        title: 'Test Album 1',
        user: {
          id: 100,
          name: 'User One',
          email: 'user1@example.com'
        }
      }
    },
    {
      id: 2,
      title: 'Test Photo 2',
      url: 'http://example.com/photo2.jpg',
      thumbnailUrl: 'http://example.com/thumb2.jpg',
      album: {
        id: 20,
        title: 'Test Album 2',
        user: {
          id: 200,
          name: 'User Two',
          email: 'user2@example.com'
        }
      }
    }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays skeleton components when loading', () => {
    // Set usePhotos to return a loading state
    (usePhotos as any).mockReturnValue({
      photos: [],
      loading: true,
      error: ''
    });

    render(<PhotoGallery />);

    // Check that at least one skeleton is rendered.
    // We assume the skeleton component renders text like "Loading" or uses the skeleton library's structure.
    // For this example, we check for an element with text "Loading..." if that's how you implemented fallback.
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it('renders photo cards when data is loaded', async () => {
    (usePhotos as any).mockReturnValue({
      photos: mockPhotos,
      loading: false,
      error: ''
    });

    render(<PhotoGallery />);

    // Wait for the photo cards to appear
    await waitFor(() => {
      expect(screen.getByText(/Test Photo 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Album 1/i)).toBeInTheDocument();
      expect(screen.getByText(/User One/i)).toBeInTheDocument();
      expect(screen.getByText(/Test Photo 2/i)).toBeInTheDocument();
    });
  });

  it('renders filtering inputs and updates values', () => {
    (usePhotos as any).mockReturnValue({
      photos: [],
      loading: false,
      error: ''
    });

    render(<PhotoGallery />);

    // Find the input elements
    const titleInput = screen.getByPlaceholderText(/Filter by title/i);
    const albumInput = screen.getByPlaceholderText(/Filter by album.title/i);
    const emailInput = screen.getByPlaceholderText(
      /Filter by album.user.email/i
    );
    const limitInput = screen.getByPlaceholderText(/Page size \(limit\)/i);
    const offsetInput = screen.getByPlaceholderText(/Offset/i);

    // Simulate user typing in filter inputs
    fireEvent.change(titleInput, { target: { value: 'Sunset' } });
    fireEvent.change(albumInput, { target: { value: 'Vacation' } });
    fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
    fireEvent.change(limitInput, { target: { value: '5' } });
    fireEvent.change(offsetInput, { target: { value: '10' } });

    // Verify that the inputs have updated values
    expect((titleInput as HTMLInputElement).value).toBe('Sunset');
    expect((albumInput as HTMLInputElement).value).toBe('Vacation');
    expect((emailInput as HTMLInputElement).value).toBe('user@example.com');
    expect((limitInput as HTMLInputElement).value).toBe('5');
    expect((offsetInput as HTMLInputElement).value).toBe('10');
  });
});
