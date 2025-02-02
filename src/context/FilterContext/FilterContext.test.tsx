// tests/FilterContext.test.tsx
import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { FilterProvider, useFilter } from './FilterContext';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../utils/constants';

describe('FilterContext', () => {
  const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <FilterProvider>{children}</FilterProvider>
  );

  let hookResult: any;

  beforeEach(() => {
    hookResult = renderHook(() => useFilter(), { wrapper });
  });

  describe('when initialized', () => {
    it('should have default inputFilters with the correct limit', () => {
      expect(hookResult.result.current.inputFilters.limit).toBe(DEFAULT_LIMIT);
    });

    it('should have default inputFilters with the correct offset', () => {
      expect(hookResult.result.current.inputFilters.offset).toBe(
        DEFAULT_OFFSET
      );
    });

    it('should have default appliedFilters with the correct limit', () => {
      expect(hookResult.result.current.appliedFilters.limit).toBe(
        DEFAULT_LIMIT
      );
    });

    it('should have default appliedFilters with the correct offset', () => {
      expect(hookResult.result.current.appliedFilters.offset).toBe(
        DEFAULT_OFFSET
      );
    });
  });

  describe('when updating the filter values', () => {
    it('should update inputFilters when setInputFilters is called', () => {
      act(() => {
        hookResult.result.current.setInputFilters((prev: any) => ({
          ...prev,
          title: 'Sunset'
        }));
      });
      expect(hookResult.result.current.inputFilters.title).toBe('Sunset');
    });

    it('should update appliedFilters when applyFilters is called', () => {
      // First update inputFilters, then call applyFilters.
      act(() => {
        hookResult.result.current.setInputFilters((prev: any) => ({
          ...prev,
          title: 'Sunset'
        }));
      });
      act(() => {
        hookResult.result.current.applyFilters();
      });
      expect(hookResult.result.current.appliedFilters.title).toBe('Sunset');
    });
  });
});
