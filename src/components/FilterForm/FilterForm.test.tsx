// tests/FilterForm.test.tsx
import React from 'react';
import { describe, it, expect, beforeEach, vi, MockInstance } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterForm from './FilterForm';
import { FilterProvider } from '../../context/FilterContext/FilterContext';
import { Id, toast, ToastContent, ToastOptions } from 'react-toastify';

describe('FilterForm Component', () => {
  // Create a wrapper that provides the FilterContext
  const setup = () =>
    render(
      <FilterProvider>
        <FilterForm />
      </FilterProvider>
    );

  let toastSuccessSpy: MockInstance<
    [
      content: ToastContent<unknown>,
      options?: ToastOptions<unknown> | undefined
    ],
    Id
  >;

  beforeEach(() => {
    vi.clearAllMocks();
    // Create a spy on toast.success before each test
    toastSuccessSpy = vi.spyOn(toast, 'success');
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

  describe('when updating filter input values', () => {
    beforeEach(() => {
      setup();
    });

    it('should update the photo title filter input value when a new value is entered', () => {
      const titleInput = screen.getByLabelText(
        /Photo Title/i
      ) as HTMLInputElement;
      fireEvent.change(titleInput, { target: { value: 'Sunset' } });
      expect(titleInput.value).toBe('Sunset');
    });

    it('should update the album title filter input value when a new value is entered', () => {
      const albumInput = screen.getByLabelText(
        /Album Title/i
      ) as HTMLInputElement;
      fireEvent.change(albumInput, { target: { value: 'Vacation' } });
      expect(albumInput.value).toBe('Vacation');
    });

    it('should update the user email filter input value when a new value is entered', () => {
      const emailInput = screen.getByLabelText(
        /User Email/i
      ) as HTMLInputElement;
      fireEvent.change(emailInput, { target: { value: 'user@example.com' } });
      expect(emailInput.value).toBe('user@example.com');
    });

    it('should update the limit input value when a new value is entered', () => {
      const limitInput = screen.getByLabelText(
        /Page Size \(Limit\)/i
      ) as HTMLInputElement;
      fireEvent.change(limitInput, { target: { value: '5' } });
      expect(limitInput.value).toBe('5');
    });

    it('should update the offset input value when a new value is entered', () => {
      const offsetInput = screen.getByLabelText(/Offset/i) as HTMLInputElement;
      fireEvent.change(offsetInput, { target: { value: '10' } });
      expect(offsetInput.value).toBe('10');
    });
  });
});
