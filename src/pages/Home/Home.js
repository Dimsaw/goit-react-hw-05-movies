import { useState, useEffect } from 'react';
import { getTrending } from '../../secvices/API';

import { Link } from 'react-router-dom';
// import s from './Home.module.css';

function Home() {
  const [trendings, setTrendings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const movies = await getTrending();
        setTrendings(movies);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMovies();
  }, []);
  return (
    <section>
      <h1>Trendings films today</h1>
      <ul>
        {trendings.map(({ id, title, poster_path }) => (
          <li key={id}>
            <Link to={`/movie/${id}`}></Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Home;
