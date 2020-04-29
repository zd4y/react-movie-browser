import React, { useState, useEffect } from 'react';
import { MovieList } from './';
import { useDebouncedCallback } from 'use-debounce';
import useQuery from '../hooks/useQuery';

export default function MovieBrowser({ history }) {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const queryParam = useQuery().get('q');

  function fetchData(value) {
    setQuery(value);
    if (value) {
      history.push(`/search${value && `?q=${value}`}`);
    }
  }

  const [debouncedFunction, cancelDebounce] = useDebouncedCallback(
    fetchData,
    1000
  );

  function handleChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedFunction(value);
  }

  useEffect(() => {
    cancelDebounce();
    const q = queryParam || '';
    setSearchTerm(q);
    setQuery(q);
  }, [queryParam, cancelDebounce]);

  function handleSubmit(e) {
    e.preventDefault();
    cancelDebounce();
    fetchData(e.target[0].value);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="search-box">
        <h2 className="search-heading">Search movies</h2>
        <input
          name="q"
          value={searchTerm}
          onChange={handleChange}
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
