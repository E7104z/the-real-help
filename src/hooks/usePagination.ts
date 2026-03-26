import { useState, useCallback } from 'react';

interface UsePaginationOptions {
  pageSize?: number;
}

interface UsePaginationResult {
  page: number;
  pageSize: number;
  offset: number;
  nextPage: () => void;
  prevPage: () => void;
  goToPage: (p: number) => void;
  reset: () => void;
}

export function usePagination({ pageSize = 25 }: UsePaginationOptions = {}): UsePaginationResult {
  const [page, setPage] = useState(1);

  const nextPage = useCallback(() => { setPage((p) => p + 1); }, []);
  const prevPage = useCallback(() => { setPage((p) => Math.max(1, p - 1)); }, []);
  const goToPage = useCallback((p: number) => { setPage(Math.max(1, p)); }, []);
  const reset = useCallback(() => { setPage(1); }, []);

  return {
    page,
    pageSize,
    offset: (page - 1) * pageSize,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
}
