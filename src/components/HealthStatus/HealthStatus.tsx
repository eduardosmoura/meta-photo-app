import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';

const HealthStatus: React.FC = () => {
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
      <span className="inline-block rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700">
        Checking...
      </span>
    );
  }

  return (
    <span
      className={` inline-block rounded-full px-2 py-1 text-sm ${
        isHealthy ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
      }`}
    >
      {isHealthy ? '✔ API Up' : '✖ API Down'}
    </span>
  );
};

export default HealthStatus;
