import { Route, Routes } from 'react-router-dom';

import Container from '../components/Container';
import { Suspense } from 'react';

import Home from '../pages/Home/Home';

function App() {
  return (
    <Container>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </Container>
  );
}

export default App;
