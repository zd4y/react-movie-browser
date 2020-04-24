import React from 'react';
import { Link } from 'react-router-dom';

const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default function Movie({
  movie: { id, title, poster_path, release_date }
}) {
  return (
    <Link to={`/movie/${id}`} className="movie">
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
    </Link>
  );
}
