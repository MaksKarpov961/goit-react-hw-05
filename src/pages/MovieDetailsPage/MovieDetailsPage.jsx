import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import getMovies from "../../getMovies";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const initialLocationState = useRef(location.state);
  const query = initialLocationState.current?.query;

  const fetchMoreInfoMovies = useCallback(async () => {
    if (!movieId) return;
    try {
      const infoFoMovies = await getMovies("moreInfo", "", movieId);
      setMovie(infoFoMovies);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      fetchMoreInfoMovies();
    }
  }, [movieId, fetchMoreInfoMovies]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  const { poster_path, title, overview, release_date, vote_average, genres } =
    movie;

  const handleGoBack = () => {
    const from = initialLocationState.current?.from;

    if (from === "/movies") {
      navigate(`${from}?query=${query}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={s.container}>
      <button className={s.button} type="button" onClick={handleGoBack}>
        Go back
      </button>
      <div>
        <div>
          <div className={s.title_info}>
            <img
              src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
              alt={title}
            />
            <div className={s.info}>
              <h3>{title}</h3>
              <p>{overview}</p>
              <h4>Genres</h4>
              <p>{genres.map((item) => `${item.name} `)}</p>
              <h4>Rating:</h4>
              <p>{Math.round(vote_average * 10)}%</p>
              <h4>Release Date:</h4>
              <p>{release_date}</p>
            </div>
          </div>
          <p className={s.more_info}>Additional info:</p>
          <ul className={s.list}>
            <li>
              <Link
                className={s.link}
                to="cast"
                state={{ from: location.pathname }}
              >
                Cast
              </Link>
            </li>
            <li>
              <Link
                className={s.link}
                to="reviews"
                state={{ from: location.pathname }}
              >
                Reviews
              </Link>
            </li>
          </ul>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
