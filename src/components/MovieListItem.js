import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as DefaultImg } from '../assets/icons/video.svg';

export default function MovieListItem({
  movie: { id, title, poster_path, release_date }
}) {
  let location = useLocation();
  const [imgError, setImgError] = useState();

  return (
    <Link
      to={{
        pathname: `/movie/${id}`,
        state: { background: location }
      }}
      className="movie"
    >
      <div className="movie-img-box">
        {imgError ? (
          <DefaultImg className="movie-img broken-img" />
        ) : (
          <img
            onError={() => setImgError(true)}
            alt={`${title} Poster`}
            className="movie-img"
            src={`${process.env.REACT_APP_IMG_URL}${poster_path}`}
          />
        )}
      </div>
      <p className="movie-title" title={title}>
        {title}
      </p>
      <p className="movie-date">{release_date || <span>&nbsp;</span>}</p>
    </Link>
  );
}
