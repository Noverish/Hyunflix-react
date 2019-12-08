import { useState, useEffect, useCallback } from 'react';
import { parse, stringify } from 'query-string';
import { History } from 'history';
import { debounce } from 'debounce';

import { SearchResult } from 'api';
import { USER_INPUT_DEBOUNCE } from 'config';

export interface SearchState<T> {
  items: T[];
  total: number;
  loading: boolean;
}

export type Result<T> = {
  items: T[];
  total: number;
  loading: boolean;
  query: string;
  page: number;

  setQuery: (query: string) => void;
  setPage: (page: number) => void;
  refresh: () => void;
};

type SearchFunction<T> = (query, page: number, pageSize: number) => Promise<SearchResult<T>>;

function extractQuery() {
  const { q, p } = parse(window.location.search);
  const query: string = (q || '') as string;
  const page: number = parseInt(p as string || '1');
  return { query, page };
}

export const useSearch = <T>(search: SearchFunction<T>, history: History, pageSize: number): Result<T> => {
  const [state, setState] = useState({
    items: [],
    total: 0,
    loading: false,
  } as SearchState<T>);

  const { items, total, loading } = state;
  const { query, page } = extractQuery();

  const refresh = useCallback(() => {
    setState(state => ({ ...state, loading: true }));

    search(query, page, pageSize)
      .then((result: SearchResult<T>) => {
        setState({
          total: result.total,
          items: result.results,
          loading: false,
        });
      });
  }, [search, pageSize, page, query]);

  const debouncedOnQueryChange = useCallback(debounce((newQuery: string) => {
    if (query !== newQuery) {
      const querystring = stringify({ p: 1, q: newQuery });
      history.replace(window.location.pathname + '?' + querystring);
    } else {
      setState(state => ({ ...state, loading: false }));
    }
  }, USER_INPUT_DEBOUNCE), [query]);

  const setQuery = useCallback((query: string) => {
    setState(state => ({ ...state, loading: true }));
    debouncedOnQueryChange(query);
  }, [debouncedOnQueryChange]);

  const setPage = useCallback((page: number) => {
    const querystring = stringify({ q: query, p: page });
    history.replace(window.location.pathname + '?' + querystring);
  }, [query, history]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { items, total, loading, query, page, setQuery, setPage, refresh };
};
