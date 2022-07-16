import { useState, useEffect } from 'react';
import { getTrending } from '../../secvices/API';

import { Link } from 'react-router-dom';
import s from './Home.module.css';
import placeHolder from '../../images/no-image.jpeg';

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
      <ul className={s.list}>
        {trendings.map(({ id, title, poster_path, name, original_title }) => (
          <li key={id} className={s.item}>
            <Link to={`/movies/${id}`}>
              <div>
                <img
                  className={s.img}
                  src={
                    poster_path
                      ? `https://image.tmdb.org/t/p/w500${poster_path}`
                      : placeHolder
                  }
                  alt={name ?? original_title}
                />
              </div>
              <p className={s.link}> {title}</p>
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
