import React, { useState } from 'react';
import { usePhotos, PhotoFilters } from '../../hooks/usePhotos/usePhotos';
import { PhotoCard } from '../PhotoCard/PhotoCard';
import { SkeletonPhotoCard } from '../SkeletonPhotoCard/SkeletonPhotoCard';
import { toast } from 'react-toastify';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from 'utils';
import HealthStatusTag from 'components/HealthStatusTag/HealthStatusTag';

const PhotoGallery: React.FC = () => {
  // State for the input fields (filters being edited)
  const [inputFilters, setInputFilters] = useState<PhotoFilters>({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET
  });

  // State for the filters that are actually applied to trigger data load
  const [appliedFilters, setAppliedFilters] = useState<PhotoFilters>({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET
  });

  // Use the applied filters to fetch data. Data is re-fetched only when appliedFilters changes.
  const { photos, loading, error } = usePhotos(appliedFilters);

  // Update input fields state as the user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputFilters({
      ...inputFilters,
      [e.target.name]: e.target.value
    });
  };

  // Specialized handlers for limit and offset, converting values to numbers.
  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || DEFAULT_LIMIT;
    setInputFilters({
      ...inputFilters,
      limit: value
    });
  };

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || DEFAULT_OFFSET;
    setInputFilters({
      ...inputFilters,
      offset: value
    });
  };

  // When the form is submitted, update appliedFilters which triggers a new API call.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAppliedFilters({ ...inputFilters });
    toast.success('Filters applied.');
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">MetaPhoto APP</h1>
        <HealthStatusTag />
      </header>
      <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 flex-col">
            <label htmlFor="title" className="mb-1 font-medium">
              Photo Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              placeholder="Filter by title"
              className="border p-2"
              value={inputFilters.title || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="album-title" className="mb-1 font-medium">
              Album Title
            </label>
            <input
              id="album-title"
              type="text"
              name="album.title"
              placeholder="Filter by album.title"
              className="border p-2"
              value={inputFilters['album.title'] || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="user-email" className="mb-1 font-medium">
              User Email
            </label>
            <input
              id="user-email"
              type="text"
              name="album.user.email"
              placeholder="Filter by album.user.email"
              className="border p-2"
              value={inputFilters['album.user.email'] || ''}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 flex-col">
            <label htmlFor="limit" className="mb-1 font-medium">
              Page Size (Limit)
            </label>
            <input
              id="limit"
              type="number"
              name="limit"
              placeholder="Page size (limit)"
              className="border p-2"
              value={inputFilters.limit?.toString()}
              onChange={handleLimitChange}
            />
          </div>
          <div className="flex flex-1 flex-col">
            <label htmlFor="offset" className="mb-1 font-medium">
              Offset
            </label>
            <input
              id="offset"
              type="number"
              name="offset"
              placeholder="Offset"
              className="border p-2"
              value={inputFilters.offset?.toString()}
              onChange={handleOffsetChange}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="rounded bg-[#FF8C00] p-2 text-white"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </form>
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

export default PhotoGallery;
