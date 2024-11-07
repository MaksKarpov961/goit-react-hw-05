import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMovies from "../../getMovies";
import s from "./MovieCast.module.css";

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
    <>
      {cast.length === 0 && <p>No cast available</p>}
      {cast.length > 0 && (
        <ul className={s.list}>
          {castSlice.map(({ id, name, profile_path, character }) => (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w200/${profile_path}`}
                alt="No Photo"
              />
              <h4>{name}</h4>
              <p>{character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
