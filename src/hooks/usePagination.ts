import { useState } from 'react';

export interface Pagination<TFilter> {
  size: number;
  page: number;
  filter?: TFilter;
}

export interface PaginationSet<TFilter> {
  pagination: Pagination<TFilter>;
  onPagination: (newPagination: Partial<Pagination<TFilter>>) => void;
  resetPagination: () => void;
}

const initialPagination= {
  size: 10,
  page: 1,
};

export const usePagination = <TFilter>(
  defaultPagination: Pagination<TFilter> = initialPagination
): PaginationSet<TFilter> => {
  const [ pagination, setPagination ] = useState<Pagination<TFilter>>(defaultPagination);

  const onPagination = (newPagination: Partial<Pagination<TFilter>>) => {
    setPagination((prev) => ({
      ...prev,
      ...newPagination,
    }));
  };

  const resetPagination = () => {
    setPagination(defaultPagination);
  };

  return {
    pagination,
    onPagination,
    resetPagination,
  };
};
