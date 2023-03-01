import { useState, useEffect } from 'react';
import { getMovieReviews } from '../../secvices/API';
import { useParams } from 'react-router-dom';

import ListReviews from './ListReviews';

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
        <ListReviews reviews={reviews} />
      ) : (
        <p> No Reviews found </p>
      )}
    </section>
  );
}
