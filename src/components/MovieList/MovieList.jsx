import { Link } from "react-router-dom";

const MovieList = ({ listMovie }) => {
  if (!listMovie || listMovie.lenght === 0) {
    return;
  }
  return (
    <ul>
      {listMovie.map(({ id, title, release_date }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>
            {title} <span>{release_date.slice(0, 4)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
