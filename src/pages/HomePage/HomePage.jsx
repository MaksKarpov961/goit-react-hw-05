import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
import getMovies from "../../getMovies";
import { useLocation } from "react-router-dom";
function HomePage() {
  const [topListMovie, setTopListMovie] = useState();
  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      if (location.pathname === "/") {
        try {
          const topListMovieDay = await getMovies();
          setTopListMovie(topListMovieDay);
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        }
      }
    };
    fetchMovies();
  }, [location]);

  return (
    <div className={s.container}>
      <h2>Trending today</h2>
      <MovieList listMovie={topListMovie} />
    </div>
  );
}

export default HomePage;
