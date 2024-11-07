import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMovies from "../../getMovies";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState();

  const fetchReviewsInfo = useCallback(async () => {
    if (!movieId) return;

    try {
      const infoReviewsFilm = await getMovies("reviews", "", movieId);
      setReviews(infoReviewsFilm);
    } catch (error) {
      console.error("Error fetching movie reviews:", error);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      fetchReviewsInfo();
    }
  }, [movieId, fetchReviewsInfo]);

  if (!reviews) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {reviews.length === 0 && <p>No reviews available</p>}

      {reviews.length > 0 && (
        <ul className={s.list}>
          {reviews.map(({ author, content, id, created_at }) => {
            const date = new Date(created_at);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            return (
              <li key={id} className={s.item}>
                <h4>{author}</h4>
                <p>{content}</p>
                <p>{formattedDate}</p>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
