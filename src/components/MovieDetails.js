import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as CloseIcon } from '../assets/icons/mark.svg';
// import { ReactComponent as StarIcon } from '../assets/icons/star.svg';
import Spinner from './Spinner';

const API = `https://api.themoviedb.org/3/movie/{movie_id}?api_key=bbebf5b6e5e3d0e032c9d39235abb724`;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

export default function MovieDetails({ history, location, match }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  const { state = {} } = location;
  const { background } = state;
  const { id } = match.params;

  function handleClick(e) {
    e.stopPropagation();
    history.goBack();
  }

  function handleModalClick(e) {
    const modal = e.target.closest('.modal');
    if (e.target !== modal) return;
    history.goBack();
  }

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const res = await axios.get(API.replace('{movie_id}', id));
      setData(res.data);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  // function getStars() {
  //   const rating = data.vote_average / 2;

  //   const extraStars = Math.floor(5 - rating);
  //   const decimalPercentage = rating - Math.floor(rating);
  //   const percentage = Math.round(decimalPercentage * 100) + '%';
  //   const roundedRating = Math.ceil(rating);

  //   const stars = [];

  //   for (let i = 1; i <= 5; i++) {
  //     const starStyle = {};
  //     const parentStyle = {};
  //     if (i <= roundedRating) {
  //       starStyle.fill = 'orange';
  //       if (i === roundedRating) {
  //         parentStyle.width = decimalPercentage === 0 ? '100%' : percentage;
  //         parentStyle.overflow = 'hidden';
  //       }
  //     } else starStyle.fill = '#d0d0d0';
  //     stars.push(
  //       <span>
  //         <span style={parentStyle}>
  //           <StarIcon key={i} style={starStyle} />
  //         </span>
  //       </span>
  //     );
  //   }

  //   return stars;
  // }

  return (
    <div
      className={background && 'modal'}
      onClickCapture={background && handleModalClick}
    >
      <div>
        {background && (
          <CloseIcon className="modal-close" onClick={handleClick} />
        )}
        {loading && <Spinner className="modal-loading" />}
        {data && (
          <div className="movie-details">
            <div className="movie-details-img-box">
              <img
                className="movie-details-img"
                src={`${IMG_URL}${data.poster_path}`}
                alt={`${data.title} Poster`}
              />
            </div>
            <div className="movie-details-main">
              <h1 className="movie-details-title">
                <a className="movie-details-link" href={data.homepage}>
                  {data.title}
                </a>
              </h1>
              <p className="movie-details-tagline">{data.tagline}</p>
              <p className="movie-details-overview">{data.overview}</p>
            </div>
            <div className="movie-details-info">
              <MovieDetail cls="budget" heading="Budget" value={data.budget} />
              <MovieDetail
                cls="revenue"
                heading="Revenue"
                value={data.revenue}
              />
              <p className="movie-details-genres">
                <strong className="movie-details-info-heading">Genres:</strong>
                <span className="movie-details-info-value">
                  {data.genres.map(g => g.name).join(', ')}
                </span>
              </p>
              <MovieDetail
                cls="original-title"
                heading="Original Title"
                value={data.original_title}
              />
              <MovieDetail
                cls="language"
                heading="Original Language"
                value={data.original_language}
              />
              <MovieDetail
                cls="popularity"
                heading="Popularity"
                value={data.popularity}
              />
              <MovieDetail
                cls="date"
                heading="Release Date"
                value={data.release_date}
              />
              <MovieDetail
                cls="runtime"
                heading="Runtime"
                value={data.runtime}
              />
              <MovieDetail cls="status" heading="Status" value={data.status} />
              {/* <MovieDetail
                cls="rating"
                heading="Rating"
                value={getStars().map(star => star)}
              /> */}
              <MovieDetail
                cls="rating"
                heading="Rating"
                value={`${data.vote_average} / 10`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MovieDetail({ cls, heading, value }) {
  return (
    <p className={`movie-details-${cls}`}>
      <strong className="movie-details-info-heading">{heading}:</strong>
      <span className="movie-details-info-value">{value}</span>
    </p>
  );
}
