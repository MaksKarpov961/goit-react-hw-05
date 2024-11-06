import MovieList from "../../components/MovieList/MovieList";

function HomePage({ listMovie }) {
  return (
    <>
      <h2>Trending today</h2>
      <MovieList listMovie={listMovie} />
    </>
  );
}

export default HomePage;
