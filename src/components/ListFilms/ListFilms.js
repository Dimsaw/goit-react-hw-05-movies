import s from '../../pages/Home/Home.module.css';
import placeHolder from '../../images/no-image.jpeg';
import { Link } from 'react-router-dom';

const ListFilms = ({ trendings }) => {
  return (
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
  );
};

export default ListFilms;
