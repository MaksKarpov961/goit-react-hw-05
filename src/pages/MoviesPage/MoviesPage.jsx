import { useNavigate, useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { useEffect, useState } from "react";
import getMovies from "../../getMovies";

const MoviesPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [searchMovie, setSearchMovie] = useState([]);
  const [searchParams] = useSearchParams();
  const queryFromUrl = searchParams.get("query");

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (query === "") {
      return;
    }
    onSubmit(query);
    e.target.reset();
  };

  const onSubmit = (newQuery) => {
    setQuery(newQuery);
    navigate(`/movies?query=${newQuery}`, { state: { query: newQuery } });
  };

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

  useEffect(() => {
    if (queryFromUrl) {
      setQuery(queryFromUrl);
    }
  }, [queryFromUrl]);

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList listMovie={searchMovie} query={query} />
    </div>
  );
};

export default MoviesPage;
