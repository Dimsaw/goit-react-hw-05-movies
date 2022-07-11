import axios from 'axios';

const KEY = '01fc814c0e3e52f0814fb7a89299a296';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export async function getTrending() {
  const response = await axios.get(`trending/movie/day?api_key=${KEY}`);

  return response.data;
}

export async function getSearchMovies(searchQuery) {
  const response = await axios.get(
    `search/movies?api_key=${KEY}&query=${searchQuery}`
  );
  return response.data;
}

export async function getMovieDetails(movieId) {
  const response = await axios.get(`movie/${movieId}?api_key=${KEY}`);
  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await axios.get(`movie/${movieId}/credits?api_key=${KEY}`);
  return response.data;
}
export async function getMovieReviews(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews?api_key=${KEY}`);
  return response.data;
}
