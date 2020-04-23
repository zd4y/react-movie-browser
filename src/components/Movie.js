import React from 'react';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default function Movie({ movie: { title, poster_path, release_date } }) {
  return (
    <a href="/" className="movie">
      <div className="movie-img-box">
        <img
          alt={`${title} Poster`}
          className="movie-img"
          src={`${IMG_URL}${poster_path}`}
        />
      </div>
      <p className="movie-title" title={title}>
        {title}
      </p>
      <p className="movie-date">{release_date}</p>
    </a>
  );
}
