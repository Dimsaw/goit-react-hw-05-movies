import React from 'react';
import { useState, useEffect } from 'react';
import { getSearchMovies } from '../../secvices/API';
import { useSearchParams } from 'react-router-dom';
import ListFilms from '../../components/ListFilms';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './Movies.module.css';

export default function Movies() {
  const [trendings, setTrendings] = useState([]);
  const [loading, setLoading] = useState(false);
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
          return setTrendings(getSearchFilms.results);
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
  }, [query]);

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
          className={s.input}
        />

        <button className={s.btn} type="submit">
          Search
        </button>
      </form>
      {loading && <h3>Loading films....</h3>}
      <ListFilms trendings={trendings} />
    </>
  );
}
