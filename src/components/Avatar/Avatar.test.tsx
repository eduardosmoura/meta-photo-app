import React from 'react';
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  MockInstance
} from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Avatar } from './Avatar';
import { Id, toast, ToastContent, ToastOptions } from 'react-toastify';

describe('Avatar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('When rendering normally', () => {
    beforeEach(() => {
      render(<Avatar src="http://example.com/test.jpg" alt="Test Image" />);
    });

    it('should render an image element', () => {
      const img = screen.getByRole('img');
      expect(img).toBeDefined();
    });

    it('should set the image src attribute correctly', () => {
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img.src).toContain('http://example.com/test.jpg');
    });

    it('should set the image alt attribute correctly', () => {
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img.alt).toBe('Test Image');
    });
  });

  describe('When the image fails to load', () => {
    let toastErrorSpy: MockInstance<
      [
        content: ToastContent<unknown>,
        options?: ToastOptions<unknown> | undefined
      ],
      Id
    >;
    let consoleErrorSpy: MockInstance<
      [message?: any, ...optionalParams: any[]],
      void
    >;

    beforeEach(() => {
      toastErrorSpy = vi.spyOn(toast, 'error');
      consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      render(<Avatar src="http://example.com/test.jpg" alt="Test Image" />);
    });

    afterEach(() => {
      toastErrorSpy.mockRestore();
      consoleErrorSpy.mockRestore();
    });

    it('should replace the image src with the placeholder when an error occurs', () => {
      const img = screen.getByRole('img') as HTMLImageElement;
      fireEvent.error(img);
      expect(img.src).toContain('/assets/logo.svg');
    });

    it('should call toast.error with the correct error message when image load fails', () => {
      const img = screen.getByRole('img') as HTMLImageElement;
      fireEvent.error(img);
      expect(toastErrorSpy).toHaveBeenCalledWith(
        'Image load failed for: Test Image'
      );
    });

    it('should call console.error with the correct error message when image load fails', () => {
      const img = screen.getByRole('img') as HTMLImageElement;
      fireEvent.error(img);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Image load failed for: Test Image'
      );
    });
  });
});
