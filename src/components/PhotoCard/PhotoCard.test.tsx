// tests/PhotoCard.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PhotoCard } from './PhotoCard';

// Sample photo data to pass as prop
const samplePhoto = {
  id: 1,
  title: 'Test Photo',
  url: 'http://example.com/photo.jpg',
  thumbnailUrl: 'http://example.com/thumb.jpg',
  album: {
    id: 10,
    title: 'Test Album',
    user: {
      id: 100,
      name: 'Test User',
      email: 'test@example.com'
    }
  }
};

describe('PhotoCard Component', () => {
  it('renders photo details correctly', () => {
    render(<PhotoCard photo={samplePhoto} />);

    // Check that the photo title is rendered
    expect(screen.getByText(/Test Photo/i)).toBeInTheDocument();

    // Check that the album title is rendered
    expect(screen.getByText(/Test Album/i)).toBeInTheDocument();

    // Check that the user name is rendered
    expect(screen.getByText(/Test User/i)).toBeInTheDocument();
  });

  it('renders an image with the correct src and alt attributes', () => {
    render(<PhotoCard photo={samplePhoto} />);

    const image = screen.getByRole('img') as HTMLImageElement;
    expect(image).toBeInTheDocument();
    expect(image.src).toContain('http://example.com/thumb.jpg');
    expect(image.alt).toBe('Test Photo');
  });
});
