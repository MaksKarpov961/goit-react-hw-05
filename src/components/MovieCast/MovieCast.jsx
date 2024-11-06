import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMovies from "../../getPopularMovies";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  const fetchCastInfo = useCallback(async () => {
    if (!movieId) return;
    try {
      const infoCastFilm = await getMovies("cast", "", movieId);
      setCast(infoCastFilm);
    } catch (error) {
      console.error("Error fetching movie cast:", error);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      fetchCastInfo();
    }
  }, [movieId, fetchCastInfo]);

  if (!cast) {
    return <p>Loading...</p>;
  }
  const castSlice = cast.slice(0, 15);

  return (
    <ul>
      {castSlice.map(({ id, name, profile_path, character }) => (
        <li key={id}>
          <img src={`https://image.tmdb.org/t/p/w200/${profile_path}`} alt="" />
          <h4>{name}</h4>
          <p>{character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
