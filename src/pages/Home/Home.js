import { useState, useEffect } from 'react';
import { getTrending } from '../../secvices/API';

import { Link } from 'react-router-dom';
import s from './Home.module.css';

export default function Home() {
  const [trendings, setTrendings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const { results } = await getTrending();
        return setTrendings(results);
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
      <h1>Trending films</h1>
      {loading && <h3>Loading films....</h3>}
      <ul>
        {trendings.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>
              <p className={s.text}> {title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
//   //   return (
//   //     <section>
//   //       <h1 className={s.text}>Trendings films today</h1>
//   //       <ul>
//   //         {trendings.map(({ id, title, poster_path }) => (
//   //           <li key={id}>
//   //             <Link to={`/movies/${id}`}>
//   //               <img
//   //                 className={s.img}
//   //                 src={`https://image.tmdb.org/t/p/w300${poster_path}`}
//   //                 alt={title}
//   //               ></img>
//   //               <p className={s.text}> {title}</p>
//   //             </Link>
//   //           </li>
//   //         ))}
//   //       </ul>
//   //     </section>
//   //   );
// };

// function Home() {
//   return <h1>Home</h1>;
// }

// export default Home;
