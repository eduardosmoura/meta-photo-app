import { apiService } from './api';
import { describe, it, expect } from 'vitest';

describe('apiService', () => {
  it('should have a default timeout of 10000ms', () => {
    expect(apiService.defaults.timeout).toEqual(10000);
  });

  it('should have a baseURL defined from VITE_API_BASE_URL or default to "http://localhost:3000"', () => {
    // In a Vite project, environment variables are available on import.meta.env
    const expectedBaseURL =
      import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
    expect(apiService.defaults.baseURL).toEqual(expectedBaseURL);
  });
});
