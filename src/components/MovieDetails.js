import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as CloseIcon } from '../assets/icons/mark.svg';
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

  return (
    <div
      className={background && 'modal'}
      onClickCapture={background && handleModalClick}
    >
      <div className="movie-details">
        {background && (
          <CloseIcon className="modal-close" onClick={handleClick} />
        )}
        {loading && <Spinner className="modal-loading" />}
        {data && (
          <div>
            <h1>{data.title}</h1>
            <img
              src={`${IMG_URL}${data.poster_path}`}
              alt={`${data.title} Poster`}
            />
          </div>
        )}
        {data &&
          Object.entries(data).map(([k, v]) => (
            <div key={k}>
              <strong>{k}</strong>: {JSON.stringify(v)}
            </div>
          ))}
      </div>
    </div>
  );
}
