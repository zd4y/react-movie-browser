import { useState, useEffect } from 'react';
import axios from 'axios';

function api(endpoint) {
  return `https://api.themoviedb.org/3/${endpoint}/movie?api_key=bbebf5b6e5e3d0e032c9d39235abb724`;
}

const API =
  'https://api.themoviedb.org/3/movie/popular?api_key=bbebf5b6e5e3d0e032c9d39235abb724';

const SEARCH = api('search');

export default function useMovieSearch(query, page, search) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => setMovies([]), [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel = () => {};
    async function fetchMovies() {
      try {
        if (search && !query) return setLoading(false);
        const { data } = await axios.get(query ? SEARCH : API, {
          params: { page, query },
          cancelToken: new axios.CancelToken(c => (cancel = c))
        });
        setMovies(oldMovies => [...oldMovies, ...data.results]);
        setHasMore(page !== data.total_pages);
        if (data.results.length === 0) throw new Error('No results found');
        setLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) setLoading(true);
        else {
          setLoading(false);
          setError(err);
        }
      }
    }
    fetchMovies();
    return () => cancel();
  }, [query, page, search]);

  return { movies, error, loading, hasMore };
}
