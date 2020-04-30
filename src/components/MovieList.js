import React, { useState, useRef, useCallback, useEffect } from 'react';
import useMovieSearch from '../hooks/useMovieSearch';

import { MovieListItem, Error } from './';
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
              ref={
                index === movies.length - 1 ? lastMovieElementRef : undefined
              }
              key={movie.id}
            >
              <MovieListItem movie={movie} />
            </li>
          ))}
      </ul>
      {loading && <Spinner style={{ margin: '20rem auto' }} />}
      {error && <Error message={error.message} />}
    </>
  );
}
