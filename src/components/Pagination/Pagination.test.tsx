import React from 'react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination, PaginationProps } from './Pagination';
import { DEFAULT_MAX_PHOTOS } from 'utils/constants';

describe('Pagination Component', () => {
  let props: PaginationProps;
  let onLimitChangeMock: Mock;
  let onPageChangeMock: Mock;

  beforeEach(() => {
    onLimitChangeMock = vi.fn();
    onPageChangeMock = vi.fn();

    props = {
      totalItems: DEFAULT_MAX_PHOTOS,
      currentLimit: 10,
      currentOffset: 0,
      onLimitChange: onLimitChangeMock,
      onPageChange: onPageChangeMock
    };
  });

  describe('when the component is rendered', () => {
    beforeEach(() => {
      render(<Pagination {...props} />);
    });

    it('should display the correct page size label', () => {
      const label = screen.getByLabelText(/Page Size:/i);
      expect(label).toBeInTheDocument();
    });

    it('should display the current page and total pages correctly', () => {
      // With 5000 items and a limit of 10, total pages = 5000/10 = 500, current page should be 1
      const pageInfo = screen.getByText(/Page 1 of 500/i);
      expect(pageInfo).toBeInTheDocument();
    });

    it('should disable the "Previous" button when on the first page', () => {
      const previousButton = screen.getByRole('button', { name: /Previous/i });
      expect(previousButton).toBeDisabled();
    });

    it('should enable the "Next" button when not on the last page', () => {
      const nextButton = screen.getByRole('button', { name: /Next/i });
      expect(nextButton).toBeEnabled();
    });
  });

  describe('when the page size (limit) is changed via the select dropdown', () => {
    beforeEach(() => {
      render(<Pagination {...props} />);
    });

    it('should call onLimitChange with the new limit when the user selects a different page size', () => {
      const selectElement = screen.getByLabelText(/Page Size:/i);
      fireEvent.change(selectElement, { target: { value: '25' } });
      expect(onLimitChangeMock).toHaveBeenCalledWith(25);
    });
  });

  describe('when navigating between pages', () => {
    it('should call onPageChange with the next page when the "Next" button is clicked', () => {
      // For currentOffset=0, currentPage=1; clicking next should call onPageChange with 2.
      render(<Pagination {...props} />);
      const nextButton = screen.getByRole('button', { name: /Next/i });
      fireEvent.click(nextButton);
      expect(onPageChangeMock).toHaveBeenCalledWith(2);
    });

    it('should call onPageChange with the previous page when the "Previous" button is clicked', () => {
      // For this test, we need to set the currentOffset so that currentPage is greater than 1.
      const updatedProps = { ...props, currentOffset: 10 }; // currentLimit = 10, offset 10 gives currentPage = 2
      render(<Pagination {...updatedProps} />);
      const previousButton = screen.getByRole('button', { name: /Previous/i });
      fireEvent.click(previousButton);
      expect(onPageChangeMock).toHaveBeenCalledWith(1);
    });
  });
});
