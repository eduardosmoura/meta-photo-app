import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PhotoCardInfo } from './PhotoCardInfo';
import { samplePhoto } from '../../../test/fixtures/samplePhoto';

describe('PhotoCardInfo Component', () => {
  const toggleModalMock = vi.fn();

  describe('when the modal is closed', () => {
    beforeEach(() => {
      render(
        <PhotoCardInfo
          photo={samplePhoto}
          isOpen={false}
          toggleModal={toggleModalMock}
        />
      );
    });

    it('should not render the modal content when isOpen is false', () => {
      const modalTitle = screen.queryByText(/Photo Metadata/i);
      expect(modalTitle).toBeNull();
    });
  });

  describe('when the modal is open', () => {
    beforeEach(() => {
      toggleModalMock.mockReset();
      render(
        <PhotoCardInfo
          photo={samplePhoto}
          isOpen={true}
          toggleModal={toggleModalMock}
        />
      );
    });

    describe('and the modal content is displayed', () => {
      it('should display the modal title "Photo Metadata"', () => {
        const modalTitle = screen.getByText('Photo Metadata');
        expect(modalTitle).toBeInTheDocument();
      });

      it('should display the photo ID label', () => {
        const photoIdLabel = screen.getByText(/Photo ID:/i);
        expect(photoIdLabel).toBeInTheDocument();
      });

      it('should display the photo title label', () => {
        const labelElements = screen.getAllByText((content, element) => {
          return (
            element?.tagName.toLowerCase() === 'span' && content === 'Title:'
          );
        });
        expect(labelElements.length).toBeGreaterThan(0);
      });

      it('should display the photo URL label', () => {
        const labelElements = screen.getAllByText((content, element) => {
          return (
            element?.tagName.toLowerCase() === 'span' && content === 'URL:'
          );
        });
        expect(labelElements.length).toBeGreaterThan(0);
      });

      it('should display the thumbnail URL label', () => {
        const thumbnailLabel = screen.getByText(/Thumbnail URL:/i);
        expect(thumbnailLabel).toBeInTheDocument();
      });

      it('should display the album ID label', () => {
        const albumIdLabel = screen.getByText(/Album ID:/i);
        expect(albumIdLabel).toBeInTheDocument();
      });

      it('should display the album title label', () => {
        const albumTitleLabel = screen.getByText(/Album Title:/i);
        expect(albumTitleLabel).toBeInTheDocument();
      });

      it('should display the user ID label', () => {
        const userIdLabel = screen.getByText(/User ID:/i);
        expect(userIdLabel).toBeInTheDocument();
      });

      it('should display the user name label', () => {
        const userNameLabel = screen.getByText(/User Name:/i);
        expect(userNameLabel).toBeInTheDocument();
      });

      it('should display the username label', () => {
        const usernameLabel = screen.getByText(/Username:/i);
        expect(usernameLabel).toBeInTheDocument();
      });

      it('should display the user email label', () => {
        const emailLabel = screen.getByText(/User Email:/i);
        expect(emailLabel).toBeInTheDocument();
      });

      it('should display the address label', () => {
        const addressLabel = screen.getByText(/Address:/i);
        expect(addressLabel).toBeInTheDocument();
      });

      it('should display the phone label', () => {
        const phoneLabel = screen.getByText(/Phone:/i);
        expect(phoneLabel).toBeInTheDocument();
      });

      it('should display the website label', () => {
        const websiteLabel = screen.getByText(/Website:/i);
        expect(websiteLabel).toBeInTheDocument();
      });

      it('should display the company label', () => {
        const companyLabel = screen.getByText(/Company:/i);
        expect(companyLabel).toBeInTheDocument();
      });
    });

    describe('and the modal close functionality', () => {
      it('should call the toggleModal callback when the close button is clicked', () => {
        const closeButton = screen.getByRole('button', { name: /✖/i });
        fireEvent.click(closeButton);
        expect(toggleModalMock).toHaveBeenCalled();
      });
    });
  });
});
