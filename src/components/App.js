import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

import Container from '../components/Container';

import AppBar from './AppBar';
import Movies from '../pages/Movies/Movies';
import { Suspense } from 'react';

const Home = lazy(() => import('../pages/Home'));

function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h3>Еще немного......</h3>}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="movies" element={<Movies />} />
        </Routes>
      </Suspense>
    </Container>
  );
}

export default App;
