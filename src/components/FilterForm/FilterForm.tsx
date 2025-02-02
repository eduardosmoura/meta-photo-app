import React, { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useFilter } from '../../context/FilterContext/FilterContext';

const FilterForm: React.FC = () => {
  const { inputFilters, setInputFilters, applyFilters } = useFilter();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputFilters({
      ...inputFilters,
      [e.target.name]: e.target.value
    });
  };

  const handleLimitChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || inputFilters.limit;
    setInputFilters({
      ...inputFilters,
      limit: value
    });
  };

  const handleOffsetChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || inputFilters.offset;
    setInputFilters({
      ...inputFilters,
      offset: value
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    applyFilters();
    toast.success('Filters applied.');
  };

  return (
    <form
      data-testid="filter-form"
      className="mb-4 space-y-4"
      onSubmit={handleSubmit}
    >
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
          <button type="submit" className="rounded bg-[#FF8C00] p-2 text-white">
            Apply Filters
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
