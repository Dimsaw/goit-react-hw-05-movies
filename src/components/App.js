import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import Container from '../components/Container';

import AppBar from './AppBar';
import Movies from '../pages/Movies/Movies';

import Cast from '../pages/Cast';
import MoviesDetails from '../pages/MoviesDetails';
import Reviews from '../pages/Reviews';
import NotFoundPage from '../pages/NotFoundPage';

const Home = lazy(() => import('../pages/Home'));

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AppBar />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:movieId" element={<MoviesDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
