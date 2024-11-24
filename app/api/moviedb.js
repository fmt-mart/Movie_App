/**----------------------------------Movie API------------------------------------------- */
import { apiKey } from "../constants";

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMovieEndpoint = `${apiBaseUrl}/trending/movie/week?api_key=${apiKey}`;
const topRatedMovieEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const popularMovieEndpoint = `${apiBaseUrl}/movie/popular?api_key=${apiKey}`;

//dynamic endpoints
const movieDetailsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;
const searchMovieEndpoint = (query) =>
  `${apiBaseUrl}/search/movie?api_key=${apiKey}&query=${query}`;

const personDetailsEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
const personMoviesEndpoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`;

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://img.myloview.com/sticker/white-laptop-icon-isolated-on-grey-background-700-209325202.jpg";

const apiCall = async (endpoints, params) => {
  const options = {
    method: "GET",
    url: endpoints,
    params: params ? params : {},
  };

  try {
    const response = await fetch(endpoints, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const fetchTrendingMovies = () => apiCall(trendingMovieEndpoint);
export const fetchTopRatedMovies = () => apiCall(topRatedMovieEndpoint);
export const fetchPopularMovies = () => apiCall(popularMovieEndpoint);
export const fetchMovieDetails = (id) => apiCall(movieDetailsEndpoint(id));
export const fetchMovieCredits = (id) => apiCall(movieCreditsEndpoint(id));
export const fetchSimilarMovies = (id) => apiCall(similarMoviesEndpoint(id));
export const fetchPersonDetails = (id) => apiCall(personDetailsEndpoint(id));
export const fetchPersonMovies = (id) => apiCall(personMoviesEndpoint(id));
export const fetchSearchMovies = (query) => apiCall(searchMovieEndpoint(query));

/**----------------------------------User API------------------------------------------- */
const userDetailsEndpoint = (id) => `http://10.0.2.2:3000/users/?id=${id}`;
export const fetchUser = (id) => apiCall(userDetailsEndpoint(id));
