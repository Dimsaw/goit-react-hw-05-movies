import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../secvices/API';

import { useState, useEffect } from 'react';
import ListCast from '../../components/ListCast';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCast() {
      setLoading(true);
      try {
        const getFilmCast = await getMovieCredits(movieId);
        setCast(getFilmCast.cast);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <section>
      {loading && <h3>Loading cast....</h3>}
      {cast.length > 0 ? (
        <ListCast cast={cast} />
      ) : (
        <p className={s.title}> No Information </p>
      )}
    </section>
  );
}
