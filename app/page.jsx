'use client';
import { useEffect } from 'react';
import Hero from './components/hero/hero.jsx';
import Filter from './components/filter/filter.jsx';
import MovieGrid from './components/movie_grid/movie_grid.jsx';
import Footer from './components/footer/footer.jsx';

import { useFuzzySearch } from './hooks/useFuzzySearch';

export default function HomePage() {
  const {
    movies,
    searchQuery,
    setSearchQuery,
    setFilterParams,
    isLoading,
    error,
    hasSearchQuery
  } = useFuzzySearch();

  // Handle search from navbar with real-time updates
  useEffect(() => {
    const handleSearch = (e) => {
      const value = e.target.value;
      setSearchQuery(value);
    };

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.addEventListener('input', handleSearch);
      return () => searchInput.removeEventListener('input', handleSearch);
    }
  }, [setSearchQuery]);

  // Update search input value when searchQuery changes
  useEffect(() => {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
      searchInput.value = searchQuery;
    }
  }, [searchQuery]);

  return (
    <main>
      <Hero />
      <div className="container">

        
        <div className="row">
          <div >
            <div className="filter-container">
              <Filter onChange={setFilterParams} />
            </div>
          </div>
          
          <div >
            {isLoading && <div className="text-center"><p>Loading...</p></div>}
            {error && <div className="text-center text-danger"><p>Error loading movies</p></div>}
            {movies && movies.length > 0 && (
              <MovieGrid movies={movies} hasSearchQuery={hasSearchQuery} />
            )}
            {movies && movies.length === 0 && (
              <div className="text-center">
                <p className="no-movies">
                  {hasSearchQuery ? 'No movies found matching your search.' : 'No movies available.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
} 