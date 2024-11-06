import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "../../pages/HomePage/HomePage";
import MoviesPage from "../../pages/MoviesPage/MoviesPage";
import Navigation from "../Navigation/Navigation";
import { useEffect, useState } from "react";
import getMovies from "../../getPopularMovies";
import MovieDetailsPage from "../../pages/MovieDetailsPage/MovieDetailsPage";
import MovieCast from "../MovieCast/MovieCast";
import MovieReviews from "../MovieReviews/MovieReviews";

function App() {
  const location = useLocation();

  const [topListMovie, setTopListMovie] = useState([]);
  const [query, setQuery] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);

  const onSubmit = (newQuery) => {
    setQuery(newQuery);
  };

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

  useEffect(() => {
    if (!query) return;

    const fetchMoviesSearch = async () => {
      try {
        const searchResults = await getMovies("search", query);
        setSearchMovie(searchResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };
    fetchMoviesSearch();
  }, [query]);

  return (
    <>
      <Navigation />

      <Routes>
        <Route
          path="/"
          element={<HomePage location={location} listMovie={topListMovie} />}
        />
        <Route
          path="/movies"
          element={<MoviesPage onSubmit={onSubmit} listMovie={searchMovie} />}
        />

        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />}>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;