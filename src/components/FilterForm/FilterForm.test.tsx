// tests/FilterForm.test.tsx
import React from 'react';
import { describe, it, expect, beforeEach, vi, MockInstance } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterForm from './FilterForm';
import { FilterProvider } from '../../context/FilterContext/FilterContext';
import { Id, toast, ToastContent, ToastOptions } from 'react-toastify';

// Helper to render the FilterForm wrapped in its context provider
const setup = () =>
  render(
    <FilterProvider>
      <FilterForm />
    </FilterProvider>
  );

describe('FilterForm Component', () => {
  let toastSuccessSpy: MockInstance<
    [
      content: ToastContent<unknown>,
      options?: ToastOptions<unknown> | undefined
    ],
    Id
  >;

  beforeEach(() => {
    vi.clearAllMocks();
    toastSuccessSpy = vi.spyOn(toast, 'success');
  });

  describe('when rendering the filter form', () => {
    beforeEach(() => {
      setup();
    });

    it('should render the Photo Title input with its label', () => {
      const photoTitleInput = screen.getByLabelText(/Photo Title/i);
      expect(photoTitleInput).toBeInTheDocument();
    });

    it('should render the Album Title input with its label', () => {
      const albumTitleInput = screen.getByLabelText(/Album Title/i);
      expect(albumTitleInput).toBeInTheDocument();
    });

    it('should render the User Email input with its label', () => {
      const userEmailInput = screen.getByLabelText(/User Email/i);
      expect(userEmailInput).toBeInTheDocument();
    });

    it('should render the Apply Filters button', () => {
      const applyButton = screen.getByRole('button', {
        name: /Apply Filters/i
      });
      expect(applyButton).toBeInTheDocument();
    });
  });

  describe('when updating filter inputs', () => {
    beforeEach(() => {
      setup();
    });

    it('should update the Photo Title input value when a new value is entered', () => {
      const titleInput = screen.getByLabelText(
        /Photo Title/i
      ) as HTMLInputElement;
      fireEvent.change(titleInput, { target: { value: 'Sunset' } });
      expect(titleInput.value).toBe('Sunset');
    });

    it('should update the Album Title input value when a new value is entered', () => {
      const albumInput = screen.getByLabelText(
        /Album Title/i
      ) as HTMLInputElement;
      fireEvent.change(albumInput, { target: { value: 'Vacation' } });
      expect(albumInput.value).toBe('Vacation');
    });

    it('should update the User Email input value when a new value is entered', () => {
      const emailInput = screen.getByLabelText(
        /User Email/i
      ) as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      expect(emailInput.value).toBe('user@example.com');
    });
  });

  describe('when submitting the filter form', () => {
    beforeEach(() => {
      setup();
    });

    it('should display a success toast message upon form submission', async () => {
      const form = screen.getByTestId('filter-form');
      fireEvent.submit(form);
      await waitFor(() => {
        expect(toastSuccessSpy).toHaveBeenCalledWith('Filters applied.');
      });
    });
  });
});
