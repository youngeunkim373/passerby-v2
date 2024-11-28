import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { isEqual } from '@/utils/common';
import { changeFilterToQueryString } from '@/utils/url';

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
  const pathname = usePathname();
  const router = useRouter();

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

    // pagination 변경 시 url에 반영
    if(!isEqual(pagination, mergedPagination)) {  
      let newQuery = `page=${mergedPagination.page}`;
  
      if(mergedPagination.filter && Object.values(mergedPagination.filter).some(Boolean)) {
        newQuery += '&' + changeFilterToQueryString(mergedPagination.filter);
      }
  
      router.replace(`${pathname}?${newQuery}`, { scroll: true });
    }

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