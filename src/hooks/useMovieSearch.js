import { useState, useEffect } from 'react';
import axios from 'axios';

function api(endpoint) {
  return `https://api.themoviedb.org/3/${endpoint}/movie?api_key=bbebf5b6e5e3d0e032c9d39235abb724`;
}

const API = api('discover');

const SEARCH = api('search');
// ('https://api.themoviedb.org/3/search/movie?api_key=bbebf5b6e5e3d0e032c9d39235abb724&query=asfasf&page=1');

export default function useMovieSearch(query, page) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => setMovies([]), [query]);

  useEffect(() => {
    setLoading(true);
    async function fetchMovies() {
      let res;
      try {
        const params = { page };
        if (query) params.query = query;
        res = await axios.get(query ? SEARCH : API, {
          params: params
        });
        setMovies(oldMovies => {
          return [...oldMovies, ...res.data.results];
        });
        if (page === res.data.total_pages) setHasMore(false);
        setLoading(false);
      } catch {
        setError(true);
      }
    }
    fetchMovies();
  }, [query, page]);

  return { movies, error, loading, hasMore };
}
