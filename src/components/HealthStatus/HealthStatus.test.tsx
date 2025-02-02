import React from 'react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import HealthStatus from './HealthStatus';
import { apiService } from '../../services/api';

vi.mock('../../services/api', () => ({
  apiService: {
    get: vi.fn()
  }
}));

describe('HealthStatus', () => {
  let mockGet: Mock<any, any>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGet = apiService.get as unknown as Mock<any, any>;
  });

  it('displays "Checking..." while loading', () => {
    mockGet.mockReturnValue(new Promise(() => {}));
    render(<HealthStatus />);
    expect(screen.getByText(/checking/i)).toBeInTheDocument();
  });

  it('displays a green tick when API is healthy', async () => {
    mockGet.mockResolvedValue({ data: { status: 'ok' } });
    render(<HealthStatus />);
    await waitFor(() => {
      expect(screen.getByText(/✔ API Up/i)).toBeInTheDocument();
    });
  });

  it('displays a red cross when API is down', async () => {
    mockGet.mockRejectedValue(new Error('API error'));
    render(<HealthStatus />);
    await waitFor(() => {
      expect(screen.getByText(/✖ API Down/i)).toBeInTheDocument();
    });
  });
});
