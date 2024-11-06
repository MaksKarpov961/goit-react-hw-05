import { Link, useLocation } from "react-router-dom";

const MovieList = ({ listMovie }) => {
  const location = useLocation();

  if (!listMovie || listMovie.length === 0) {
    return;
  }

  return (
    <ul>
      {listMovie.map(({ id, title, release_date }) => (
        <li key={id}>
          <Link to={`/movies/${id}`} state={{ from: location.pathname }}>
            {title} <span>{release_date.slice(0, 4)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
