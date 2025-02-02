import React from 'react';
import { describe, it, expect, beforeEach, vi, Mock } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

vi.mock('../../services/api', () => ({
  apiService: {
    get: vi.fn()
  }
}));

import HealthStatusTag from './HealthStatusTag';
import { apiService } from '../../services/api';

describe('HealthStatusTag', () => {
  let mockGet: Mock<any, any>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGet = apiService.get as unknown as Mock<any, any>;
  });

  it('displays "Checking..." while loading', () => {
    mockGet.mockReturnValue(new Promise(() => {}));
    render(<HealthStatusTag />);
    expect(screen.getByText(/checking/i)).toBeInTheDocument();
  });

  it('displays a green tick when API is healthy', async () => {
    mockGet.mockResolvedValue({ data: { status: 'ok' } });
    render(<HealthStatusTag />);
    await waitFor(() => {
      expect(screen.getByText(/✔ API Up/i)).toBeInTheDocument();
    });
  });

  it('displays a red cross when API is down', async () => {
    mockGet.mockRejectedValue(new Error('API error'));
    render(<HealthStatusTag />);
    await waitFor(() => {
      expect(screen.getByText(/✖ API Down/i)).toBeInTheDocument();
    });
  });
});
