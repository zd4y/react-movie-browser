import { useState, useEffect } from 'react';
import axios from 'axios';

const API_ENV = process.env.REACT_APP_API_URL;
const API_URL = `${API_ENV}/movie/popular`;
const API_SEARCH = `${API_ENV}/search/movie`;

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
        const { data } = await axios.get(query ? API_SEARCH : API_URL, {
          params: { page, query, api_key: process.env.REACT_APP_API_KEY },
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
