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
    const searchMovies = async () => {
      setLoading(true);
      try {
        const getSearchFilms = await getSearchMovies();
        return setItems(getSearchFilms.results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    searchMovies();
  }, []);
  return (
    <>
      {loading && <h3>Loading films....</h3>}
      <ul>
        {items.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/movies/${id}`}>
              <p> {title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
