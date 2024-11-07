import MovieList from "../../components/MovieList/MovieList";
import s from "./HomePage.module.css";
function HomePage({ listMovie }) {
  return (
    <div className={s.container}>
      <h2>Trending today</h2>
      <MovieList listMovie={listMovie} />
    </div>
  );
}

export default HomePage;
