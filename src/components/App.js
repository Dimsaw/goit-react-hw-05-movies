import { Route, Routes } from 'react-router-dom';

import Container from '../components/Container';

import AppBar from './AppBar';
import Home from '../pages/Home';
import Movies from '../pages/Movies/Movies';

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<AppBar />} />
        <Route index element={<Home />} />

        <Route path="movies" element={<Movies />} />
      </Routes>
    </Container>
  );
}

export default App;
