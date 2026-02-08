import {useState, useEffect } from 'react';
import MovieGrid from '../components/MovieGrid';
import { getPopularMovies } from '../services/movieService';
import LoadingSpinner from '../components/LoadingSpinner';
// Static movie data for template
//const staticMovies = [
//  {
//    id: 1,
//    title: "The Shawshank Redemption",
//    poster_path: "/placeholder-poster.jpg",
//    vote_average: 9.3,
//    release_date: "1994-09-23"
//  },
//  {
//    id: 2,
//    title: "The Godfather",
//    poster_path: "/placeholder-poster.jpg",
//    vote_average: 9.2,
//    release_date: "1972-03-14"
//  },
//  {
//    id: 3,
//    title: "The Dark Knight",
//    poster_path: "/placeholder-poster.jpg",
//    vote_average: 9.0,
//    release_date: "2008-07-18"
//  },
//  {
//    id: 4,
//    title: "Pulp Fiction",
//    poster_path: "/placeholder-poster.jpg",
//    vote_average: 8.9,
//    release_date: "1994-10-14"
//  },
//  {
//    id: 5,
//    title: "Forrest Gump",
//    poster_path: "/placeholder-poster.jpg",
//    vote_average: 8.8,
//    release_date: "1994-06-23"
//  },
//  {
//    id: 6,
//    title: "Inception",
//    poster_path: "/placeholder-poster.jpg",
//    vote_average: 8.7,
//    release_date: "2010-07-16"
//  }
//];



function Home({ searchResults }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const movieData = await getPopularMovies();
        setMovies(movieData);
      } catch (err) {
        setError('Failed to load movies. Please try again later.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);
  
  const displayMovies = searchResults || movies;

  if (loading) {
    return (
      <main className="main-content">
        <LoadingSpinner />
      </main>
    );
  }

  if (error) {
    return (
      <main className="main-content">
        <ErrorMessage message={error} />
      </main>
    )
  }

  return (
    <main className="main-content">
      <div className="content-header">
        <h2>{searchResults ? 'Search Results' : 'Popular Recipes'}</h2>
        <p>Discover and save your favorite films</p>
      </div>
      <MovieGrid movies={displayMovies} />
    </main>
  );
};

export default Home;