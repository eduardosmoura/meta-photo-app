import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PhotoFilters } from '../../hooks/usePhotos/usePhotos';
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../utils/constants';

interface FilterContextProps {
  inputFilters: PhotoFilters;
  appliedFilters: PhotoFilters;
  setInputFilters: React.Dispatch<React.SetStateAction<PhotoFilters>>;
  applyFilters: () => void;
}

const FilterContext = createContext<FilterContextProps | undefined>(undefined);

export const FilterProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [inputFilters, setInputFilters] = useState<PhotoFilters>({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET
  });
  const [appliedFilters, setAppliedFilters] = useState<PhotoFilters>({
    limit: DEFAULT_LIMIT,
    offset: DEFAULT_OFFSET
  });

  const applyFilters = () => {
    setAppliedFilters({ ...inputFilters });
  };

  return (
    <FilterContext.Provider
      value={{ inputFilters, appliedFilters, setInputFilters, applyFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = (): FilterContextProps => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};
