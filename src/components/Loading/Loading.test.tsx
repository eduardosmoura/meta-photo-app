import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading Component', () => {
  describe('when rendered', () => {
    beforeEach(() => {
      render(<Loading />);
    });

    it('should render a container div', () => {
      const divElement = screen.getByText(/Loading.../i).closest('div');
      expect(divElement).toBeDefined();
    });

    it('should display the correct text', () => {
      const textElement = screen.getByText(/Loading.../i);
      expect(textElement).toBeInTheDocument();
    });
  });
});
