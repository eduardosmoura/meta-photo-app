import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonPhotoCard: React.FC = () => {
  return (
    <div className="border rounded p-4 shadow-sm">
      <Skeleton height={192} width="100%" />
      <div className="mt-2 space-y-2">
        <Skeleton height={24} width="80%" />
        <Skeleton height={16} width="60%" />
        <Skeleton height={16} width="70%" />
      </div>
    </div>
  );
};
