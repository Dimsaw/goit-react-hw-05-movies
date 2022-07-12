import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../secvices/API';
import { useParams } from 'react-router-dom';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      try {
        const getFilmRewies = await getMovieReviews(movieId);
        setReviews(getFilmRewies.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [movieId]);
  return (
    <section>
      {loading && <h3>Loading reviews....</h3>}
      {reviews.length > 0 ? (
        <ul>
          {reviews.map(({ author, content }) => (
            <li key={author}>
              <h4>Author: {author}</h4>
              <p>{content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p> No Reviews found </p>
      )}
    </section>
  );
}
