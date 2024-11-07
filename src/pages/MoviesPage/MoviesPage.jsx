import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
const MoviesPage = ({ onSubmit, listMovie }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value.trim();
    if (query === "") {
      return;
    }
    onSubmit(query);
    e.target.reset();
  };

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
      <MovieList listMovie={listMovie} />
    </div>
  );
};

export default MoviesPage;
