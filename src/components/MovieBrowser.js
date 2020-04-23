import React, { useState } from 'react';
import MovieList from './MovieList';
import debounce from 'lodash.debounce';

export default function MovieBrowser() {
  const [query, setQuery] = useState('');
  // const [searchText, setSearchText] = useState('');

  const handleChange = debounce(value => {
    setQuery(value);
  }, 1000);

  return (
    <>
      <form onSubmit={e => e.preventDefault()} className="search-box">
        <h3 className="search-heading">Search movies</h3>
        <input
          name="q"
          onChange={e => handleChange(e.target.value)}
          type="text"
          className="search"
          placeholder="Enter the name of a movie to search for it"
        />
      </form>
      <div className="">
        {/* {message && <p className="message">{message}</p>} */}
        <MovieList query={query} />
      </div>
    </>
  );
}
