import { Link, useLocation } from 'react-router-dom';
import placeHolder from '../../images/no-image.jpeg';
import s from './Movies.module.css';

const ListMovies = ({ items }) => {
  const location = useLocation();
  return (
    <ul className={s.list}>
      {items.map(({ id, title, poster_path, name, original_title }) => (
        <li key={id} className={s.item}>
          <Link to={`${id}`} state={{ from: location }}>
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
  );
};

export default ListMovies;
