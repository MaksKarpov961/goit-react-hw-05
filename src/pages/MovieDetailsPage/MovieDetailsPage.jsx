import { Link, Outlet, useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import getMovies from "../../getPopularMovies";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

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

  return (
    <div>
      <Link to="/movies">
        <button type="button">Go back</button>
      </Link>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
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
          <Link to="cast">Cast</Link>
          <Link to="reviews">Reviews</Link>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
