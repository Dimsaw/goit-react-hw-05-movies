import { useState, useEffect } from 'react';
import { getSearchMovies } from '../../secvices/API';
import { useLocation, useSearchParams, Link } from 'react-router-dom';

export default function Movies() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const [searchQuery, setSearchQuery] = useState(query ?? '');

  useEffect(() => {
    if (!query) {
      return console.log('error');
    }
    const searchMovies = async () => {
      setLoading(true);
      try {
        const getSearchFilms = await getSearchMovies(query);
        return setItems(getSearchFilms.results);
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
  }
  return (
    <>
      <form action="" onSubmit={handleSumbit}>
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

      <ul>
        {items.map(({ id, title }) => (
          <li key={id}>
            <Link to={`${id}`} state={{ from: location }}>
              <p> {title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
