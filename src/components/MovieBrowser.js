import React, { useState, useEffect, useCallback } from 'react';
import { MovieList } from './';
import useDebounce from '../hooks/useDebounce';
import useQuery from '../hooks/useQuery';

export default function MovieBrowser({ history }) {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cancelDebounce, setCancelDebounce] = useState(false);
  const queryParam = useQuery().get('q');

  const debouncedSearchTerm = useDebounce(searchTerm, 1000, cancelDebounce);

  const fetchData = useCallback(
    value => {
      setQuery(value);
      if (value) {
        console.log('pushing');
        history.push(`/search${value && `?q=${value}`}`);
      }
    },
    [history]
  );

  useEffect(() => fetchData(debouncedSearchTerm), [
    debouncedSearchTerm,
    fetchData
  ]);

  useEffect(() => {
    setCancelDebounce(true);
    const q = queryParam || '';
    setSearchTerm(q);
    setQuery(q);
  }, [queryParam]);

  function handleSubmit(e) {
    e.preventDefault();
    setCancelDebounce(true);
    fetchData(e.target[0].value);
  }

  useEffect(() => setCancelDebounce(false), [searchTerm]);

  return (
    <>
      <form onSubmit={handleSubmit} className="search-box">
        <h2 className="search-heading">Search movies</h2>
        <input
          name="q"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          type="text"
          className="search"
          placeholder="Enter the name of a movie to search for it"
          autoFocus
        />
      </form>
      <MovieList search={true} query={query} />
    </>
  );
}
