// tests/SkeletonPhotoCard.test.tsx
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SkeletonPhotoCard } from './SkeletonPhotoCard';

describe('SkeletonPhotoCard Component', () => {
  it('renders skeleton elements correctly', () => {
    const { container } = render(<SkeletonPhotoCard />);

    // Check that at least one element with the skeleton class is rendered.
    // The react-loading-skeleton library usually applies a class named 'react-loading-skeleton'.
    const skeletonElements = container.getElementsByClassName(
      'react-loading-skeleton'
    );
    expect(skeletonElements.length).toBeGreaterThan(0);
  });
});
