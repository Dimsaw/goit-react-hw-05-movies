import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation';

// import Container from '../components/Container';
import { Suspense } from 'react';

import Home from '../pages/Home';
import Movies from '../pages/Movies/Movies';

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="movies" element={<Movies />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
