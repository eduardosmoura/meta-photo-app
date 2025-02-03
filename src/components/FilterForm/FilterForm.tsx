import React, { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useFilter } from '../../context/FilterContext/FilterContext';
import { Pagination } from '../Pagination/Pagination';
import {
  DEFAULT_LIMIT,
  DEFAULT_MAX_PHOTOS,
  DEFAULT_OFFSET
} from 'utils/constants';

const FilterForm: React.FC = () => {
  const { inputFilters, setInputFilters, applyFilters } = useFilter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFilters({
      ...inputFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    applyFilters();
    toast.success('Filters applied.');
  };

  // When the user changes the page size via the select dropdown
  const handleLimitChange = (newLimit: number) => {
    setInputFilters({
      ...inputFilters,
      limit: newLimit,
      offset: 0 // Reset the offset whenever limit changes.
    });
  };

  return (
    <form
      data-testid="filter-form"
      className="mb-4 space-y-4"
      onSubmit={handleSubmit}
    >
      {/* Row with text inputs and the Apply Filters button */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
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
        <div className="flex items-center">
          <button type="submit" className="rounded bg-[#FF8C00] p-2 text-white">
            Apply Filters
          </button>
        </div>
      </div>
      <Pagination
        totalItems={DEFAULT_MAX_PHOTOS}
        currentLimit={inputFilters.limit || DEFAULT_LIMIT}
        currentOffset={inputFilters.offset || DEFAULT_OFFSET}
        onLimitChange={handleLimitChange}
        onPageChange={(newPage: number) => {
          if (inputFilters.limit) {
            setInputFilters({
              ...inputFilters,
              offset: (newPage - 1) * inputFilters.limit
            });
          }
        }}
      />
    </form>
  );
};

export default FilterForm;
