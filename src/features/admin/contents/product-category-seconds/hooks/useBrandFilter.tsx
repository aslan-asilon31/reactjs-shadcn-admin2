import { useCallback } from 'react';
import { useParams } from '@tanstack/react-router';

import { BrandFilters } from '@/api/MainApi';

export default function useBrandFilter() {
  const searchParams = useParams({ strict: false });
  const search = searchParams.get('search') as BrandFilters['search'];
  const name = searchParams.get('name') as BrandFilters['name'];


  const setFilters = useCallback((filters: BrandFilters) => {
    searchParams((params) => {
      if (filters.search !== undefined) {
        params.set('search', filters.search);
      }

      if (filters.name) {
        params.set('name', filters.name);
      }

      return params;
    });
  }, []);

  return {
    search,
    name,
    setFilters,
  };
}