import React, { useState } from 'react';
import { usePhotos, PhotoFilters } from '../../hooks/usePhotos/usePhotos';
import { PhotoCard } from '../PhotoCard/PhotoCard';
import { SkeletonPhotoCard } from '../SkeletonPhotoCard/SkeletonPhotoCard';
import { toast } from 'react-toastify';

const PhotoGallery: React.FC = () => {
  // State for the input fields (filters being edited)
  const [inputFilters, setInputFilters] = useState<PhotoFilters>({
    limit: 10,
    offset: 0
  });

  // State for the filters that are actually applied to trigger data load
  const [appliedFilters, setAppliedFilters] = useState<PhotoFilters>({
    limit: 10,
    offset: 0
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
    const value = parseInt(e.target.value, 10) || 10;
    setInputFilters({
      ...inputFilters,
      limit: value
    });
  };

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 0;
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
      <form className="mb-4 space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex flex-col flex-1">
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
          <div className="flex flex-col flex-1">
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
          <div className="flex flex-col flex-1">
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
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="flex flex-col flex-1">
            <label htmlFor="limit" className="mb-1 font-medium">
              Page Size (Limit)
            </label>
            <input
              id="limit"
              type="number"
              name="limit"
              placeholder="Page size (limit)"
              className="border p-2"
              value={inputFilters.limit?.toString() || '10'}
              onChange={handleLimitChange}
            />
          </div>
          <div className="flex flex-col flex-1">
            <label htmlFor="offset" className="mb-1 font-medium">
              Offset
            </label>
            <input
              id="offset"
              type="number"
              name="offset"
              placeholder="Offset"
              className="border p-2"
              value={inputFilters.offset?.toString() || '0'}
              onChange={handleOffsetChange}
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="bg-[#FF8C00] text-white p-2 rounded"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: appliedFilters.limit || 10 }).map((_, idx) => (
            <SkeletonPhotoCard key={idx} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
