import MovieList from "../../components/MovieList/MovieList";

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
    <div>
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
