import placeHolder from '../../images/no-image.jpeg';
import s from '../../pages/MoviesDetails/MoviesDetails.module.css';

const ListMoviesDetails = ({ genres, film }) => {
  const { original_title, vote_average, overview, poster_path } = film;
  return (
    <section>
      <div className={s.foto}>
        <img
          className={s.image}
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
  );
};

export default ListMoviesDetails;
