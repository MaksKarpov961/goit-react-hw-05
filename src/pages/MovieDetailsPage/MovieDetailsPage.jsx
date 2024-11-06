import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import getMovies from "../../getPopularMovies";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
    // Перевіряємо, чи є в state відправлений параметр from (URL, з якого прийшов користувач)
    if (location.state?.from) {
      navigate(location.state.from); // Повертаємо на попередню сторінку
    } else {
      navigate("/"); // Якщо немає, переходимо на головну
    }
  };

  return (
    <div>
      <button type="button" onClick={handleGoBack}>
        Go back
      </button>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w400/${poster_path}`}
          alt={title}
        />
        <div>
          <h3>{title}</h3>
          <p>{overview}</p>
          <h4>Genres</h4>
          <p>{genres.map((item) => `${item.name} `)} </p>
          <h4>Rating:</h4>
          <p>{Math.round(vote_average * 10)}%</p>
          <h4>Release Date:</h4>
          <p>{release_date}</p>
        </div>
        <div>
          <p>Additional info:</p>
          <ul>
            <li>
              <Link to="cast" state={{ from: location.pathname }}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={{ from: location.pathname }}>
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
