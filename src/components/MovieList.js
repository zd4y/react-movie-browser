import React, { useState, useRef, useCallback, useEffect } from 'react';
import useMovieSearch from '../hooks/useMovieSearch';

import Movie from './Movie';
import Spinner from './Spinner';

export default function MovieList({ query, search }) {
  const [page, setPage] = useState(1);
  const { movies, loading, hasMore, error } = useMovieSearch(
    query,
    page,
    search
  );

  useEffect(() => setPage(1), [query]);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      <ul className="movies">
        {((search && query) || (!search && !query)) &&
          movies &&
          movies.map((movie, index) => (
            <li
              {...(index === movies.length - 1 && {
                ref: lastMovieElementRef
              })}
              key={movie.id}
            >
              <Movie movie={movie} />
            </li>
          ))}
      </ul>
      {loading && <Spinner style={{ margin: '20rem auto' }} />}
      {error && (
        <div className="error">
          <h3 className="error-heading">Sorry, an error occurred</h3>
          <p className="error-text">{error.message}</p>
        </div>
      )}
    </>
  );
}
