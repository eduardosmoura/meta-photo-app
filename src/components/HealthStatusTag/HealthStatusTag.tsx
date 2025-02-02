// src/components/HealthStatusTag.tsx
import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';

const HealthStatusTag: React.FC = () => {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await apiService.get<{ status: string }>('/health');
        // Expecting the endpoint to return { status: 'ok' } when healthy
        if (response.data.status === 'ok') {
          setIsHealthy(true);
        } else {
          setIsHealthy(false);
        }
      } catch (error) {
        console.error('Health check failed:', error);
        setIsHealthy(false);
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  if (loading) {
    return (
      <span className="inline-block px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
        Checking...
      </span>
    );
  }

  return (
    <span
      className={`inline-block px-2 py-1 rounded-full text-sm ${
        isHealthy ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
      }`}
    >
      {isHealthy ? '✔ API Up' : '✖ API Down'}
    </span>
  );
};

export default HealthStatusTag;
