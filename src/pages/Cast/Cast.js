import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../secvices/API';

import { useState, useEffect } from 'react';
import placeHolder from '../../images/no-image.jpeg';
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
        <ul className={s.list}>
          {cast.map(({ id, name, original_name, profile_path, character }) => (
            <li key={id} className={s.item}>
              <div>
                <img
                  className={s.img}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : placeHolder
                  }
                  alt={name ?? original_name}
                />
              </div>
              <div>
                <h4 className={s.title}>Name: {name ?? original_name}</h4>
                <h4 className={s.title}> Character: {character}</h4>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.title}> No Information </p>
      )}
    </section>
  );
}
