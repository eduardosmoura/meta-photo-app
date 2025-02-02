// tests/HealthStatusTag.test.tsx
import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';

// Import the module as a namespace so that the mock is correctly applied.
import * as apiServiceModule from '../../services/api';
import HealthStatusTag from './HealthStatusTag';

// Mock the module using an inline factory.
vi.mock('../../src/services/api', () => ({
  apiService: {
    get: vi.fn()
  }
}));

// Now, extract the mocked apiService from the imported namespace.
const mockedApiService = apiServiceModule.apiService as {
  get: ReturnType<typeof vi.fn>;
};

describe('HealthStatusTag', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('displays "Checking..." while loading', () => {
    // Simulate a promise that never resolves to test the loading state.
    mockedApiService.get.mockReturnValue(new Promise(() => {}));
    render(<HealthStatusTag />);
    expect(screen.getByText(/checking/i)).toBeInTheDocument();
  });

  it('displays a green tick when API is healthy', async () => {
    mockedApiService.get.mockResolvedValue({ data: { status: 'ok' } });
    render(<HealthStatusTag />);
    await waitFor(() => {
      expect(screen.getByText(/✔ API Up/i)).toBeInTheDocument();
    });
  });

  it('displays a red cross when API is down', async () => {
    mockedApiService.get.mockRejectedValue(new Error('API error'));
    render(<HealthStatusTag />);
    await waitFor(() => {
      expect(screen.getByText(/✖ API Down/i)).toBeInTheDocument();
    });
  });
});
