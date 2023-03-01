import React from 'react';
import placeHolder from '../../images/no-image.jpeg';
import s from '../../pages/Cast/Cast.module.css';

const ListCast = ({ cast }) => {
  return (
    <ul className={s.list}>
      {cast.map(({ id, name, original_name, profile_path, character }) => (
        <li key={id} className={s.item}>
          <div className={s.box}>
            <img
              className={s.img}
              src={
                profile_path
                  ? `https://image.tmdb.org/t/p/w500${profile_path}`
                  : placeHolder
              }
              alt={name ?? original_name}
            />
          </div>
          <div>
            <h4 className={s.title}>Name: {name ?? original_name}</h4>
            <h4 className={s.title}> Character: {character}</h4>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListCast;
