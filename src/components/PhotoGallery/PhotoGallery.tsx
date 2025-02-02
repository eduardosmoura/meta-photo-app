import React from 'react';
import { usePhotos } from '../../hooks/usePhotos/usePhotos';
import { PhotoCard } from '../PhotoCard/PhotoCard';
import { SkeletonPhotoCard } from '../SkeletonPhotoCard/SkeletonPhotoCard';
import HealthStatus from 'components/HealthStatus/HealthStatus';
import FilterForm from '../FilterForm/FilterForm';
import {
  FilterProvider,
  useFilter
} from '../../context/FilterContext/FilterContext';
import { DEFAULT_LIMIT } from '../../utils/constants';

const PhotoGalleryContent: React.FC = () => {
  const { appliedFilters } = useFilter();

  // Use the applied filters to fetch data. Data is re-fetched only when appliedFilters changes.
  const { photos, loading, error } = usePhotos(appliedFilters);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">MetaPhoto APP</h1>
        {import.meta.env.VITE_NODE_ENV !== 'production' && <HealthStatus />}
      </header>
      <FilterForm />
      {error && <div className="mb-4 text-red-500">{error}</div>}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: appliedFilters.limit || DEFAULT_LIMIT }).map(
            (_, idx) => (
              <SkeletonPhotoCard key={idx} />
            )
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};

const PhotoGallery: React.FC = () => {
  return (
    <FilterProvider>
      <PhotoGalleryContent />
    </FilterProvider>
  );
};

export default PhotoGallery;
