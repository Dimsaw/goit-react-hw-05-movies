import { useState, useEffect, Suspense } from 'react';
import { getMovieDetails } from '../../secvices/API';
import Cast from '../Cast';
import Reviews from '../Reviews';
import placeHolder from '../../images/no-image.jpeg';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';

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
  const { original_title, vote_average, overview, poster_path } = film;
  return (
    <>
      {loading && <h3>Loading films....</h3>}
      <Link to={backLink}> Go back </Link>
      {film && (
        <section>
          <div>
            <img
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : placeHolder
              }
              alt={original_title}
            />
          </div>
          <div>
            <h2> {original_title}</h2>
            <p> User Score: {vote_average * 10}%</p>
            {film && (
              <div>
                <h3>Genres</h3>
                <ul>
                  {genres.map(genre => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <h3>Overview</h3>
              <p> {overview}</p>
            </div>
          </div>
        </section>
      )}
      <section>
        <div>
          <h3>Additional information</h3>

          <Link to={`cast`} movieid={movieId} state={{ from: backLink }}>
            Cast
          </Link>
          <Link to={`reviews`} movieid={movieId} state={{ from: backLink }}>
            Reviews
          </Link>
        </div>
      </section>
      <Suspense fallback={((<Cast />), (<Reviews />))}>
        <Outlet />
      </Suspense>
    </>
  );
}
