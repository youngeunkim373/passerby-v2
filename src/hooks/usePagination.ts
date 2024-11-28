import { useState } from 'react';

export interface Pagination<TFilter> {
  size: number;
  page: number;
  filter?: TFilter;
}

interface PaginationOptions<TFilter> {
  defaultPagination?: Pagination<TFilter>;
  afterPagination?: (pagination: Pagination<TFilter>) => Promise<void>;
}

export interface PaginationSet<TFilter> {
  pagination: Pagination<TFilter>;
  onPagination: (newPagination: Partial<Pagination<TFilter>>) => void;
  resetPagination: () => void;
}

const DEFAULT_PAGINATION = {
  size: 10,
  page: 1,
};

export const usePagination = <TFilter>({
  defaultPagination = DEFAULT_PAGINATION,
  afterPagination,
}: PaginationOptions<TFilter>): PaginationSet<TFilter> => {

  const [ pagination, setPagination ] = useState<Pagination<TFilter>>(defaultPagination);

  const onPagination = async (newPagination: Partial<Pagination<TFilter>>) => {
    const mergedPagination: Pagination<TFilter> = {
      page: newPagination.page ?? pagination.page,
      size: newPagination.size ?? pagination.size,
      filter: {
        ...(pagination.filter ?? {}),
        ...(newPagination.filter ?? {})
      } as TFilter,
    };

    // pagination state 변경 및 data fetch
    setPagination(mergedPagination);

    if (afterPagination) {
      await afterPagination(mergedPagination);
    }

    return mergedPagination;
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