import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';

import { useHistory, useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function MovieBrowser() {
  const history = useHistory();
  const params = useQuery();
  const [query, setQuery] = useState('');

  function fetchMovies(e) {
    const value = e.target.value;
    setQuery(value);
    history.push(`/search${value && `?q=${value}`}`);
  }

  useEffect(() => {
    const queryParam = params.get('q');
    setQuery(queryParam);
  }, [params]);

  return (
    <>
      <form onSubmit={e => e.preventDefault()} className="search-box">
        <h2 className="search-heading">Search movies</h2>
        <input
          name="q"
          value={query || ''}
          onChange={fetchMovies}
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
