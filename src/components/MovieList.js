import React, { useState, useRef, useCallback } from 'react';
import useMovieSearch from '../hooks/useMovieSearch';

import Movie from './Movie';
import Spinner from './Spinner';

export default function MovieList({ query }) {
  const [page, setPage] = useState(1);
  const { movies, loading, hasMore } = useMovieSearch(query, page);

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
      {loading && <Spinner />}
      <ul className="movies">
        {movies &&
          movies.map(({ id, ...movie }, index) => (
            <li
              {...(index === movies.length - 1 && {
                ref: lastMovieElementRef
              })}
              key={id}
            >
              <Movie movie={movie} />
            </li>
          ))}
      </ul>
    </>
  );
}
