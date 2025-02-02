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
  albumId: 10,
  album: {
    id: 10,
    title: 'Test Album',
    userId: 100,
    user: {
      id: 100,
      name: 'Test User',
      username: 'Bret',
      email: 'test@example.com',
      address: {
        street: 'Kulas Light',
        suite: 'Apt. 556',
        city: 'Gwenborough',
        zipcode: '92998-3874',
        geo: {
          lat: '-37.3159',
          lng: '81.1496'
        }
      },
      phone: '1-770-736-8031 x56442',
      website: 'hildegard.org',
      company: {
        name: 'Romaguera-Crona',
        catchPhrase: 'Multi-layered client-server neural-net',
        bs: 'harness real-time e-markets'
      }
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
