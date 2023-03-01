import { useState, useEffect } from 'react';
import { getTrending } from '../../secvices/API';

import ListFilms from './ListFilms';
import s from './Home.module.css';

export default function Home() {
  const [trendings, setTrendings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const getFilmsTranding = await getTrending();
        return setTrendings(getFilmsTranding.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);
  return (
    <>
      <h1 className={s.text}>Trending films</h1>
      {loading && <h3>Loading films....</h3>}
      <ListFilms trendings={trendings} />
    </>
  );
}
