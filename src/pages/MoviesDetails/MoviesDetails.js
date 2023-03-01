import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails } from '../../secvices/API';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import ListMoviesDetails from '../../components/ListMoviesDetails';
import s from './MoviesDetails.module.css';

export default function MoviesDetails() {
  const { movieId } = useParams();
  const [film, setFilm] = useState({});
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const location = useLocation();
  const backLink = location?.state?.from ?? '/';

  useEffect(() => {
    async function fetchFilm() {
      setLoading(true);
      try {
        const getFilmDetails = await getMovieDetails(movieId);
        setFilm(getFilmDetails);
        setGenres(getFilmDetails.genres);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchFilm();
  }, [movieId]);

  return (
    <>
      {loading && <h3>Loading films....</h3>}
      <Link to={backLink}>Go back</Link>
      {film && <ListMoviesDetails genres={genres} film={film} />}
      <section>
        <h3>Additional information</h3>

        <div className={s.list}>
          <Link
            to={`cast`}
            movieid={movieId}
            state={{ from: backLink }}
            className={s.link}
          >
            Cast
          </Link>
          <Link
            to={`reviews`}
            movieid={movieId}
            state={{ from: backLink }}
            className={s.link}
          >
            Reviews
          </Link>
        </div>
      </section>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
}
