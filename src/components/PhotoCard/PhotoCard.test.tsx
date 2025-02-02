import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PhotoCard } from './PhotoCard';
import { samplePhoto } from '../../../test/fixtures/samplePhoto';

describe('PhotoCard Component', () => {
  beforeEach(() => {
    render(<PhotoCard photo={samplePhoto} />);
  });

  describe('when rendering the textual information', () => {
    it('should render the photo title inside a heading element', () => {
      const titleHeading = screen.getByRole('heading', { level: 2 });
      expect(titleHeading).toHaveTextContent(samplePhoto.title);
    });

    it('should render the album title inside the element labeled "Album:"', () => {
      // Find a paragraph whose text starts with "Album:" then check that it includes the album title.
      const albumParagraph = screen.getAllByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'p' && content.startsWith('Album:')
        );
      })[0];
      expect(albumParagraph).toHaveTextContent(samplePhoto.album.title);
    });

    it('should render the user details (name and email) inside the element labeled "By:"', () => {
      // Find a paragraph whose text starts with "By:" and then check that it contains the user name and email.
      const userParagraph = screen.getAllByText((content, element) => {
        return (
          element?.tagName.toLowerCase() === 'p' && content.startsWith('By:')
        );
      })[0];
      expect(userParagraph).toHaveTextContent(samplePhoto.album.user.name);
      expect(userParagraph).toHaveTextContent(samplePhoto.album.user.email);
    });
  });

  describe('when rendering the image element', () => {
    let image: HTMLImageElement;
    beforeEach(() => {
      image = screen.getByRole('img') as HTMLImageElement;
    });

    it('should render an image element', () => {
      expect(image).toBeDefined();
    });

    it('should set the image src attribute correctly', () => {
      expect(image.src).toContain(samplePhoto.thumbnailUrl);
    });

    it('should set the image alt attribute correctly', () => {
      expect(image.alt).toBe(samplePhoto.title);
    });
  });
});
