// tests/PhotoGallery.test.tsx
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PhotoGallery from './PhotoGallery';
import { usePhotos } from '../../hooks/usePhotos/usePhotos';
import { mockPhotos } from '../../../test/fixtures/samplePhoto';

// Mock the usePhotos hook to control its output
vi.mock('../../hooks/usePhotos/usePhotos', () => ({
  usePhotos: vi.fn()
}));

describe('PhotoGallery Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('when photos are successfully loaded', () => {
    beforeEach(() => {
      // Simulate that the hook returns the photos, with no loading or error.
      (usePhotos as any).mockReturnValue({
        photos: mockPhotos,
        loading: false,
        error: ''
      });
      render(<PhotoGallery />);
    });

    describe('verifying that the photo details are rendered in the correct places', () => {
      it('should render the first photo title inside its heading element', async () => {
        await waitFor(() => {
          // Assume that the PhotoCard component renders the photo title as a heading
          const titleHeading = screen.getByRole('heading', {
            name: /Test Photo 1/i
          });
          expect(titleHeading).toBeInTheDocument();
        });
      });

      it('should render the first album title in the element labeled "Album:"', async () => {
        await waitFor(() => {
          // Look for a paragraph whose text begins with "Album:" and then check that its parent contains the album title.
          const albumParagraph = screen.getAllByText((content, element) => {
            return (
              element?.tagName.toLowerCase() === 'p' &&
              content.startsWith('Album:')
            );
          })[0];
          expect(albumParagraph).toHaveTextContent('Test Album 1');
        });
      });

      it('should render the first user name in the element labeled "By:"', async () => {
        await waitFor(() => {
          // Look for a paragraph that starts with "By:" then verify it contains the user name.
          const userParagraph = screen.getAllByText((content, element) => {
            return (
              element?.tagName.toLowerCase() === 'p' &&
              content.startsWith('By:')
            );
          })[0];
          expect(userParagraph).toHaveTextContent('User One');
        });
      });
    });
  });

  describe('when no photos are available', () => {
    beforeEach(() => {
      (usePhotos as any).mockReturnValue({
        photos: [],
        loading: false,
        error: ''
      });
      render(<PhotoGallery />);
    });

    describe('verifying the empty gallery state', () => {
      it('should render an empty gallery when there are no photos', () => {
        // Assume each PhotoCard is rendered with a test id "photo-card"
        const photoCards = screen.queryAllByTestId('photo-card');
        expect(photoCards.length).toBe(0);
      });
    });
  });

  describe('Filter form functionality', () => {
    beforeEach(() => {
      (usePhotos as any).mockReturnValue({
        photos: [],
        loading: false,
        error: ''
      });
      render(<PhotoGallery />);
    });

    describe('when updating filter inputs', () => {
      it('should update the photo title input value when a new value is entered', () => {
        const titleInput = screen.getByLabelText(
          /Photo Title/i
        ) as HTMLInputElement;
        fireEvent.change(titleInput, { target: { value: 'Sunset' } });
        expect(titleInput.value).toBe('Sunset');
      });

      it('should update the album title input value when a new value is entered', () => {
        const albumInput = screen.getByLabelText(
          /Album Title/i
        ) as HTMLInputElement;
        fireEvent.change(albumInput, { target: { value: 'Vacation' } });
        expect(albumInput.value).toBe('Vacation');
      });

      it('should update the user email input value when a new value is entered', () => {
        const emailInput = screen.getByLabelText(
          /User Email/i
        ) as HTMLInputElement;
        fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
        expect(emailInput.value).toBe('user@example.com');
      });
    });
  });
});
