import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { ToastContainer } from 'react-toastify';
import Container from '../components/Container';

const AppBar = lazy(() => import('../components/AppBar'));
const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MoviesDetails = lazy(() => import('../pages/MoviesDetails'));
const Cast = lazy(() => import('../pages/Cast'));
const Reviews = lazy(() => import('../pages/Reviews'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

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
      <ToastContainer autoClose={3000} />
    </Container>
  );
}

export default App;
