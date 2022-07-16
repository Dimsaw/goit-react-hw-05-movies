import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchMovies } from '../../secvices/API';
import { useLocation, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import placeHolder from '../../images/no-image.jpeg';
import s from './Movies.module.css';

export default function Movies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [searchQuery, setSearchQuery] = useState(query ?? '');

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) {
        return console.log('form is empty');
      }
      try {
        setLoading(true);
        const getSearchFilms = await getSearchMovies(query);
        if (getSearchFilms.results.length > 0) {
          return setItems(getSearchFilms.results);
        } else {
          return toast.error('We did not find any movies for you!');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, [query, setSearchParams]);

  function onChangeInput(e) {
    setSearchQuery(e.currentTarget.value);
  }

  function handleSumbit(e) {
    e.preventDefault();

    setSearchParams({ query: searchQuery.toLowerCase().trim() });
    if (query === '') {
      return toast.warning('The form is empty');
    }
  }
  return (
    <>
      <form action="" onSubmit={handleSumbit} className={s.form}>
        <input
          onChange={onChangeInput}
          type="text"
          autoComplete="off"
          autoFocus
          name="query"
          value={searchQuery}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <h3>Loading films....</h3>}

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
    </>
  );
}
