import React, { useState, useEffect, useRef } from 'react';
import { MovieList } from './';
import useDebounce from '../hooks/useDebounce';
import useQuery from '../hooks/useQuery';

export default function MovieBrowser({ history }) {
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cancelDebounce, setCancelDebounce] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000, cancelDebounce);

  const queryParam = useRef(useQuery().get('q'));

  useEffect(() => {
    // setCancelDebounce(true);
    setQuery(queryParam.current);
    if (query) history.push(`/search${query && `?q=${query}`}`);
    // setCancelDebounce(false);
  }, [query, queryParam, history]);

  useEffect(() => {}, [query]);

  useEffect(() => (queryParam.current = debouncedSearchTerm), [
    debouncedSearchTerm
  ]);

  function handleSubmit(e) {
    e.preventDefault();
    setCancelDebounce(true);
    queryParam.current = e.target[0].value;
    setCancelDebounce(false);
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="search-box">
        <h2 className="search-heading">Search movies</h2>
        <input
          name="q"
          value={searchTerm || ''}
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
