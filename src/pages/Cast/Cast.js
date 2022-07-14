import { useParams } from 'react-router-dom';
import { getMovieCredits } from '../../secvices/API';

import { useState, useEffect } from 'react';
import placeHolder from '../../images/no-image.jpeg';

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
        <ul>
          {cast.map(({ id, name, original_name, profile_path, character }) => (
            <li key={id}>
              <h4>Name: {name ?? original_name}</h4>
              <h4>Character: {character}</h4>
              <div>
                <img
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : placeHolder
                  }
                  alt={name ?? original_name}
                />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p> No Information </p>
      )}
    </section>
  );
}
