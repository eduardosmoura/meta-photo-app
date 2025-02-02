import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar Component', () => {
  const placeholderImage = '../../src/assets/logo.svg';

  it('renders an image with the correct src and alt attributes', () => {
    render(<Avatar src="http://example.com/test.jpg" alt="Test Image" />);

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('http://example.com/test.jpg');
    expect(img.alt).toBe('Test Image');
  });
});
